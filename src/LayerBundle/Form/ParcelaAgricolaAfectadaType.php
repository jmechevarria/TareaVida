<?php

namespace LayerBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ParcelaAgricolaAfectadaType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('geom')->add('fid')->add('numero')->add('division')->add('nombre')->add('direccion')->add('numpostal')->add('area')->add('fechacreac')->add('fechacambi')->add('tipoparc')->add('delughab')->add('decayo')->add('tiposup')->add('tipouso')->add('espuso')->add('poseedor')->add('propietari')->add('regimen')->add('nic')->add('valcat')->add('municipio')->add('consejopop')->add('finca')->add('riego')->add('roturacion')->add('usufructo')->add('miPrinx')->add('municipioNombre');
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'LayerBundle\Entity\ParcelaAgricolaAfectada'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'layerbundle_ParcelaAgricolaAfectada';
    }


}
