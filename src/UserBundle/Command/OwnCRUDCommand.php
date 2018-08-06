<?php

namespace UserBundle\Command;

//use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
//use Symfony\Component\Console\Command\Command;
//use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
//use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpKernel\Bundle\BundleInterface;
//use Sensio\Bundle\GeneratorBundle\Command\Helper\DialogHelper;
use Sensio\Bundle\GeneratorBundle\Generator\DoctrineCrudGenerator;
//use Sensio\Bundle\GeneratorBundle\Generator\DoctrineFormGenerator;
//use Sensio\Bundle\GeneratorBundle\Manipulator\RoutingManipulator;
//use Symfony\Component\Console\Output\Output;
//use Sensio\Bundle\GeneratorBundle\Command\GenerateDoctrineCommand;
use Sensio\Bundle\GeneratorBundle\Command\GenerateDoctrineCrudCommand;
use Sensio\Bundle\GeneratorBundle\Command\Validators;
use Doctrine\ORM\Mapping\ClassMetadataInfo;
use Symfony\Component\Filesystem\Filesystem;

class OwnCRUDCommand extends GenerateDoctrineCrudCommand {

    protected $routePrefix;
    protected $routeNamePrefix;
    protected $bundle;
    protected $entity;
    protected $metadata;
    protected $format;
    protected $actions;
    protected $skeleton;

    protected function configure() {
        $this
                ->setDefinition(array(
                    new InputOption('entity', '', InputOption::VALUE_REQUIRED, 'The entity class name to initialize (shortcut notation)'),
                    new InputOption('route-prefix', '', InputOption::VALUE_REQUIRED, 'The route prefix'),
                    new InputOption('with-write', '', InputOption::VALUE_REQUIRED, 'Whether or not to generate create, new and delete actions', true),
                    new InputOption('format', '', InputOption::VALUE_REQUIRED, 'Use the format for configuration files (php, xml, yml, or annotation)', 'yml'),
                    new InputOption('overwrite', '', InputOption::VALUE_REQUIRED, 'Do not stop the generation if crud controller already exist, thus overwriting all generated files', true),
                ))
                ->setDescription('Generates a CRUD based on a Doctrine entity')
                ->setName('own:crud')
        ;
    }

    protected function interact(InputInterface $input, OutputInterface $output) {
        $dialog = $this->getDialogHelper();
        $dialog->writeSection($output, 'Welcome to the Doctrine2 CRUD generator');

        // namespace
        $output->writeln(array(
            '',
            'This command helps you generate CRUD controllers and templates.',
            '',
            'First, you need to give the entity for which you want to generate a CRUD.',
            'You can give an entity that does not exist yet and the wizard will help',
            'you defining it.',
            '',
            'You must use the shortcut notation like <comment>AcmeBlogBundle:Post</comment>.',
            '',
        ));

        $entity = $dialog->askAndValidate($output, $dialog->getQuestion('The Entity shortcut name', $input->getOption('entity')), array('Sensio\Bundle\GeneratorBundle\Command\Validators', 'validateEntityName'), false, $input->getOption('entity'));
        $input->setOption('entity', $entity);
        list($bundle, $entity) = $this->parseShortcutNotation($entity);

        // write?
        $withWrite = $input->getOption('with-write') ? : false;
        $output->writeln(array(
            '',
            'By default, the generator creates two actions: list and show.',
            'You can also ask it to generate "write" actions: new, update, and delete.',
            '',
        ));
        $withWrite = $dialog->askConfirmation($output, $dialog->getQuestion('Do you want to generate the "write" actions', $withWrite ? 'yes' : 'no', '?'), $withWrite);
        $input->setOption('with-write', $withWrite);

        // format
        $format = $input->getOption('format');
        $output->writeln(array(
            '',
            'Determine the format to use for the generated CRUD.',
            '',
        ));
        $format = $dialog->askAndValidate($output, $dialog->getQuestion('Configuration format (yml, xml, php, or annotation)', $format), array('Sensio\Bundle\GeneratorBundle\Command\Validators', 'validateFormat'), false, $format);
        $input->setOption('format', $format);

        // route prefix
        $prefix = $this->getRoutePrefix($input, $entity);
        $output->writeln(array(
            '',
            'Determine the routes prefix (all the routes will be "mounted" under this',
            'prefix: /prefix/, /prefix/new, ...).',
            '',
        ));
        $prefix = $dialog->ask($output, $dialog->getQuestion('Routes prefix', '/' . $prefix . '/'), '/' . $prefix);
        $input->setOption('route-prefix', $prefix);

        //overwrite
        $forceOverwrite = $input->getOption('overwrite') ? : false;
        $output->writeln(array(
            '',
            'If a crud created from entity '
            . $this->getHelper('formatter')->formatBlock($entity, 'bg=blue;fg=white;b')
            . ' exists you can delete it along all its generated files.',
            'All files will be replaced with the generated by this command if you select "yes"',
            '',
        ));

        $forceOverwrite = $dialog->askConfirmation($output, $dialog->getQuestion(
                        'Do you want to overwrite previous files', $forceOverwrite ? 'yes' : 'no', '?'), $forceOverwrite);
        $input->setOption('overwrite', $forceOverwrite);

        // summary
        $output->writeln(array(
            '',
            $this->getHelper('formatter')->formatBlock('Summary before generation', 'bg=blue;fg=white', true),
            '',
            sprintf("You are going to generate a CRUD controller for \"<info>%s:%s</info>\"", $bundle, $entity),
            sprintf("using the \"<info>%s</info>\" format.", $format),
            '',
        ));
    }

    protected function execute(InputInterface $input, OutputInterface $output) {
        $dialog = $this->getDialogHelper();

        if ($input->isInteractive()) {
            if (!$dialog->askConfirmation($output, $dialog->getQuestion('Do you confirm generation', 'yes', '?'), true)) {
                $output->writeln('<error>Command aborted</error>');

                return 1;
            }
        }

        $entity = Validators::validateEntityName($input->getOption('entity'));
        list($bundle, $entity) = $this->parseShortcutNotation($entity);

        $format = Validators::validateFormat($input->getOption('format'));
        $prefix = $this->getRoutePrefix($input, $entity);
        $withWrite = $input->getOption('with-write');
        $forceOverwrite = $input->getOption('overwrite');
        $dialog->writeSection($output, 'CRUD generation');
        $entityClass = $this->getContainer()->get('doctrine')->getAliasNamespace($bundle) . '\\' . $entity;

        $metadata = $this->getEntityMetadata($entityClass);
        $bundle = $this->getContainer()->get('kernel')->getBundle($bundle);
//        $generator = $this->getGenerator($bundle);
        $this->generate($bundle, $entity, $metadata[0], $format, $prefix, $withWrite, $forceOverwrite);
        $output->writeln('Generating the CRUD code: <info>OK</info>');

        $errors = array();
        $runner = $dialog->getRunner($output, $errors);

        // form
        if ($withWrite) {
            $this->generateFormType($bundle, $entity, $metadata[0]);
            $output->writeln('Generating the Form code: <info>OK</info>');
        }

        // routing
        if ('annotation' != $format) {
            $runner($this->updateRouting($dialog, $input, $output, $bundle, $format, $entity, $prefix));
        }

        $dialog->writeGeneratorSummary($output, $errors);
    }

    protected function generateFormType(BundleInterface $bundle, $entity, ClassMetadataInfo $metadata) {
        $parts = explode('\\', $entity);
        $entityClass = array_pop($parts);

        $this->className = $entityClass . 'Type';
        $dirPath = $bundle->getPath() . '/Form';
        $this->classPath = $dirPath . '/' . str_replace('\\', '/', $entity) . 'Type.php';

//        if (file_exists($this->classPath)) {
//            throw new \RuntimeException(sprintf('Unable to generate the %s form class as it already exists under the %s file', $this->className, $this->classPath));
//        }

        if (count($metadata->identifier) > 1) {
            throw new \RuntimeException('The form generator does not support entity classes with multiple primary keys.');
        }

        $parts = explode('\\', $entity);
        array_pop($parts);

        $this->renderFile('form/FormType.php.twig', $this->classPath, array(
            'fields' => $this->getFieldsFromMetadata($metadata),
            'namespace' => $bundle->getNamespace(),
            'entity_namespace' => implode('\\', $parts),
            'entity_class' => $entityClass,
            'bundle' => $bundle->getName(),
            'form_class' => $this->className,
            'form_type_name' => strtolower(str_replace('\\', '_', $bundle->getNamespace()) . ($parts ? '_' : '' ) . implode('_', $parts) . '_' . substr($this->className, 0, -4)),
        ));
    }

    protected function createGenerator($bundle = null) {
        return new DoctrineCrudGenerator($this->getContainer()->get('filesystem'));
    }

    protected function getRoutePrefix(InputInterface $input, $entity) {
        $prefix = $input->getOption('route-prefix') ? : strtolower(str_replace(array('\\', '/'), '_', $entity));

        if ($prefix && '/' === $prefix[0]) {
            $prefix = substr($prefix, 1);
        }

        return $prefix;
    }

    public function generate(BundleInterface $bundle, $entity, ClassMetadataInfo $metadata, $format, $routePrefix, $needWriteActions, $forceOverwrite) {
        $this->routePrefix = $routePrefix;
        $this->routeNamePrefix = str_replace('/', '_', $routePrefix);
        $this->actions = $needWriteActions ? array('index', 'show', 'new', 'edit', 'delete') : array('index', 'show');

        if (count($metadata->identifier) > 1) {
            throw new \RuntimeException('The CRUD generator does not support entity classes with multiple primary keys.');
        }

        if (!in_array('id', $metadata->identifier)) {
            throw new \RuntimeException('The CRUD generator expects the entity object has a primary key field named "id" with a getId() method.');
        }

        $this->entity = $entity;
        $this->bundle = $bundle;
        $this->metadata = $metadata;
        $this->setFormat($format);

        $this->generateControllerClass($forceOverwrite);
        $dir = sprintf('%s/Resources/views/%s', $this->bundle->getPath(), str_replace('\\', '/', $this->entity));


        $filesystem = new Filesystem();

        if (!file_exists($dir)) {
            $filesystem->mkdir($dir, 0777);
        }

        $this->generateIndexView($dir);
        if (in_array('show', $this->actions)) {
            $this->generateShowView($dir);
        }

        if (in_array('new', $this->actions)) {
            $this->generateNewView($dir);
        }

        if (in_array('edit', $this->actions)) {
            $this->generateEditView($dir);
        }

        $this->generateLayout($dir);

        if (in_array('delete', $this->actions)) {
            $dir = $this->getContainer()->get('kernel')->getRootdir() . '\\Resources\\views\\modals';
            $this->generateModals($dir);
        }

        $this->generateTestClass();
        $this->generateConfiguration();
    }

    private function setFormat($format) {
        switch ($format) {
            case 'yml':
            case 'xml':
            case 'php':
            case 'annotation':
                $this->format = $format;
                break;
            default:
                $this->format = 'yml';
                break;
        }
    }

    protected function generateControllerClass($forceOverwrite) {
        $dir = $this->bundle->getPath();

        $parts = explode('\\', $this->entity);
        $entityClass = array_pop($parts);
        $entityNamespace = implode('\\', $parts);

        $target = sprintf(
                '%s/Controller/%s/%sController.php', $dir, str_replace('\\', '/', $entityNamespace), $entityClass
        );

        if (!$forceOverwrite && file_exists($target)) {
            throw new \RuntimeException('Unable to generate the controller as it already exists.');
        }

        $this->renderFile('controller.php.twig', $target, array(
            'actions' => $this->actions,
            'route_prefix' => $this->routePrefix,
            'route_name_prefix' => $this->routeNamePrefix,
            'bundle' => $this->bundle->getName(),
            'entity' => $this->entity,
            'entity_class' => $entityClass,
            'namespace' => $this->bundle->getNamespace(),
            'entity_namespace' => $entityNamespace,
            'format' => $this->format,
        ));
    }

    protected function generateIndexView($dir) {
        $this->renderFile('views/index.html.twig.twig', $dir . '/index.html.twig', array(
            'bundle' => $this->bundle->getName(),
            'entity' => $this->entity,
            'fields' => $this->metadata->fieldMappings,
            'actions' => $this->actions,
            'record_actions' => $this->getRecordActions(),
            'route_prefix' => $this->routePrefix,
            'route_name_prefix' => $this->routeNamePrefix,
        ));
    }

    protected function getRecordActions() {
        return array_filter($this->actions, function($item) {
            return in_array($item, array('show', 'edit'));
        }
        );
    }

    protected function generateShowView($dir) {
        $this->renderFile('views/show.html.twig.twig', $dir . '/show.html.twig', array(
            'bundle' => $this->bundle->getName(),
            'entity' => $this->entity,
            'fields' => $this->metadata->fieldMappings,
            'actions' => $this->actions,
            'route_prefix' => $this->routePrefix,
            'route_name_prefix' => $this->routeNamePrefix,
        ));
    }

    protected function generateNewView($dir) {
        $this->renderFile('views/new.html.twig.twig', $dir . '/new.html.twig', array(
            'bundle' => $this->bundle->getName(),
            'entity' => $this->entity,
            'route_prefix' => $this->routePrefix,
            'route_name_prefix' => $this->routeNamePrefix,
            'actions' => $this->actions,
        ));
    }

    protected function generateEditView($dir) {
        $this->renderFile('views/edit.html.twig.twig', $dir . '/edit.html.twig', array(
            'route_prefix' => $this->routePrefix,
            'route_name_prefix' => $this->routeNamePrefix,
            'entity' => $this->entity,
            'bundle' => $this->bundle->getName(),
            'actions' => $this->actions,
        ));
    }

    protected function generateLayout($dir) {
        $this->renderFile('views/layout.html.twig.twig', $dir . '/layout.html.twig', array(
            'route_prefix' => $this->routePrefix,
            'route_name_prefix' => $this->routeNamePrefix,
            'entity' => $this->entity,
            'bundle' => $this->bundle->getName(),
            'actions' => $this->actions,
        ));
    }

    protected function generateModals($dir) {
        $this->renderFile('modals/modal_delete_ENTITYNAME.html.twig.twig', $dir . '/modal_delete_' . $this->routeNamePrefix . '.html.twig', array(
            'route_prefix' => $this->routePrefix,
            'route_name_prefix' => $this->routeNamePrefix,
            'entity' => $this->entity,
            'bundle' => $this->bundle->getName(),
            'actions' => $this->actions,
        ));
    }

    protected function renderFile($template, $target, $parameters) {
        if (!is_dir(dirname($target))) {
            mkdir(dirname($target), 0777, true);
        }

        return file_put_contents($target, $this->render($template, $parameters));
    }

    protected function render($template, $parameters) {
        $this->skeleton = array(
            dirname(__DIR__) . '\\CRUD\\Templates'
        );

        $twig = new \Twig_Environment(new \Twig_Loader_Filesystem($this->skeleton), array('debug' => true,
            'cache' => false,
            'strict_variables' => true,
            'autoescape' => false,
        ));

        return $twig->render($template, $parameters);
    }

    protected function generateTestClass() {
        $parts = explode('\\', $this->entity);
        $entityClass = array_pop($parts);
        $entityNamespace = implode('\\', $parts);

        $dir = $this->bundle->getPath() . '/Tests/Controller';
        $target = $dir . '/' . str_replace('\\', '/', $entityNamespace) . '/' . $entityClass . 'ControllerTest.php';

        $this->renderFile('tests/test.php.twig', $target, array(
            'route_prefix' => $this->routePrefix,
            'route_name_prefix' => $this->routeNamePrefix,
            'entity' => $this->entity,
            'bundle' => $this->bundle->getName(),
            'entity_class' => $entityClass,
            'namespace' => $this->bundle->getNamespace(),
            'entity_namespace' => $entityNamespace,
            'actions' => $this->actions,
            'form_type_name' => strtolower(str_replace('\\', '_', $this->bundle->getNamespace()) . ($parts ? '_' : '' ) . implode('_', $parts) . '_' . $entityClass . 'Type'),
        ));
    }

    protected function generateConfiguration() {
        if (!in_array($this->format, array('yml', 'xml', 'php'))) {
            return;
        }

        $target = sprintf(
                '%s/Resources/config/routing/%s.%s', $this->bundle->getPath(), strtolower(str_replace('\\', '_', $this->entity)), $this->format
        );

        $this->renderFile('config/routing.' . $this->format . '.twig', $target, array(
            'actions' => $this->actions,
            'route_prefix' => $this->routePrefix,
            'route_name_prefix' => $this->routeNamePrefix,
            'bundle' => $this->bundle->getName(),
            'entity' => $this->entity,
        ));
    }

    private function getFieldsFromMetadata(ClassMetadataInfo $metadata) {
        $fields = (array) $metadata->fieldNames;

        // Remove the primary key field if it's not managed manually
        if (!$metadata->isIdentifierNatural()) {
            $fields = array_diff($fields, $metadata->identifier);
        }

        foreach ($metadata->associationMappings as $fieldName => $relation) {
            if ($relation['type'] !== ClassMetadataInfo::ONE_TO_MANY) {
                $fields[] = $fieldName;
            }
        }

        return $fields;
    }

}
