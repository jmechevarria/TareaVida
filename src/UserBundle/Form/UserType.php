<?php

namespace UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

//use Symfony\Component\Form\Extension\Core\Type\FileType;

class UserType extends AbstractType {

    protected $password_required;

//
    public function __construct($password_required = true) {
        $this->password_required = $password_required;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
                ->add('image', 'file', array('required' => FALSE, 'attr' => array('accept' => 'image/*')))
                ->add('name', null)
                ->add('lastname')
                ->add('username')
                ->add('email')
                ->add('password', 'repeated', array(
                    'first_name' => 'Password', 'second_name' => 'Retype_password',
                    'type' => 'password',
                    'required' => $this->password_required,
                    'invalid_message' => 'Passwords must match'
                        )
                )
                ->add('theme')
        ;
    }

//
//    /**
//     * @param OptionsResolverInterface $resolver
//     */
//    public function setDefaultOptions(OptionsResolverInterface $resolver) {
//        $resolver->setDefaults(array(
//            'data_class' => 'UserBundle\Entity\User'
//        ));
//    }

    /**
     * Configures the options for this type.
     *
     * @param OptionsResolver $resolver The resolver for the options
     */
    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults(array(
            'data_class' => 'UserBundle\Entity\User',
        ));
    }

    /**
     * @return string
     */
    public function getName() {
        return 'mmcoh_userbundle_user';
    }

}
