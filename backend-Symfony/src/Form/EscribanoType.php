<?php

namespace App\Form;

use App\Entity\Escribano;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EscribanoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('dni')
            ->add('apellido')
            ->add('nombre')
            ->add('fechaNacimiento')
            ->add('direccion')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Escribano::class,
        ]);
    }
}
