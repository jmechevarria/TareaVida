<?php

namespace TareaVidaBundle\Controller;

use TareaVidaBundle\Entity\Layer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Layer controller.
 *
 */
class LayerController extends Controller
{
    /**
     * Lists all layer entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $layers = $em->getRepository('TareaVidaBundle:Layer')->findAll();

        return $this->render('layer/index.html.twig', array(
            'layers' => $layers,
        ));
    }

    /**
     * Creates a new layer entity.
     *
     */
    public function newAction(Request $request)
    {
        $layer = new Layer();
        $form = $this->createForm('TareaVidaBundle\Form\LayerType', $layer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($layer);
            $em->flush();

            return $this->redirectToRoute('tareavida_layer_show', array('id' => $layer->getId()));
        }

        return $this->render('layer/new.html.twig', array(
            'layer' => $layer,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a layer entity.
     *
     */
    public function showAction(Layer $layer)
    {
        $deleteForm = $this->createDeleteForm($layer);

        return $this->render('layer/show.html.twig', array(
            'layer' => $layer,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing layer entity.
     *
     */
    public function editAction(Request $request, Layer $layer)
    {
        $deleteForm = $this->createDeleteForm($layer);
        $editForm = $this->createForm('TareaVidaBundle\Form\LayerType', $layer);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('tareavida_layer_edit', array('id' => $layer->getId()));
        }

        return $this->render('layer/edit.html.twig', array(
            'layer' => $layer,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a layer entity.
     *
     */
    public function deleteAction(Request $request, Layer $layer)
    {
        $form = $this->createDeleteForm($layer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($layer);
            $em->flush();
        }

        return $this->redirectToRoute('tareavida_layer_index');
    }

    /**
     * Creates a form to delete a layer entity.
     *
     * @param Layer $layer The layer entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Layer $layer)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('tareavida_layer_delete', array('id' => $layer->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
