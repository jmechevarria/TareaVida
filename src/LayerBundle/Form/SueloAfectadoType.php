<?php

namespace LayerBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SueloAfectadoType extends AbstractType {

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder->add('geom')
                ->add('clasifId')
                ->add('clasifidcomp')
                ->add('municipioid')
                ->add('clasificacionid')
                ->add('municipio')
                ->add('tipos')
                ->add('subtipos')
                ->add('gravillosidad')
                ->add('pedregosidad')
                ->add('rocosidad')
                ->add('profundidadEfectiva')
                ->add('pendiente')
                ->add('clavePerfil')
                ->add('perfil')
                ->add('control')
                ->add('profundidad')
                ->add('hojacartogrFica')
                ->add('nro')
                ->add('w')
                ->add('e')
                ->add('salinidad')
                ->add('erosion')
                ->add('clasificacionid2')
                ->add('clavePerfil2')
                ->add('ajo')
                ->add('arrozFrio')
                ->add('arrozPrimavera')
                ->add('berengena')
                ->add('boniato')
                ->add('cafe')
                ->add('calabaza')
                ->add('caASoca')
                ->add('cebolla')
                ->add('citrico')
                ->add('col')
                ->add('frijoles')
                ->add('frutabomba')
                ->add('guayaba')
                ->add('maiz')
                ->add('malangaColocacia')
                ->add('malangaXantosorna')
                ->add('mango')
                ->add('melN')
                ->add('papa')
                ->add('pastoArtificial')
                ->add('pepino')
                ->add('pimiento')
                ->add('piA')
                ->add('platanoFruta')
                ->add('platanoVianda')
                ->add('remolacha')
                ->add('tabaco')
                ->add('tomate')
                ->add('yuca')
                ->add('zanahoria')
                ->add('catgral10cult')
                ->add('area');
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults(array(
            'data_class' => 'LayerBundle\Entity\SueloAfectado'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix() {
        return 'layerbundle_sueloafectado';
    }

}
