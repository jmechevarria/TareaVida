<?php

namespace LayerBundle\Controller;

use LayerBundle\Entity\AccionDeMejoramiento;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Acciondemejoramiento controller.
 *
 */
class AccionDeMejoramientoController extends Controller {

    /**
     * Lists all accionDeMejoramiento entities.
     *
     */
    public function indexAction(Request $r) {
        $em = $this->getDoctrine()->getManager();

        $accionesDeMejoramiento = $em->getRepository('LayerBundle:AccionDeMejoramiento')->findAll();

        return $this->render('acciondemejoramiento/index.html.twig', array(
                    'accionDeMejoramientos' => $accionesDeMejoramiento,
        ));
    }

    /**
     * Creates a new accionDeMejoramiento entity.
     *
     */
    public function newAction(Request $request) {
        $accionDeMejoramiento = new Acciondemejoramiento();
        $form = $this->createForm('LayerBundle\Form\AccionDeMejoramientoType', $accionDeMejoramiento);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($accionDeMejoramiento);
            $em->flush();

            return $this->redirectToRoute('acciondemejoramiento_show', array('id' => $accionDeMejoramiento->getId()));
        }

        return $this->render('acciondemejoramiento/new.html.twig', array(
                    'accionDeMejoramiento' => $accionDeMejoramiento,
                    'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a accionDeMejoramiento entity.
     *
     */
    public function showAction(AccionDeMejoramiento $accionDeMejoramiento) {
        $deleteForm = $this->createDeleteForm($accionDeMejoramiento);

        return $this->render('acciondemejoramiento/show.html.twig', array(
                    'accionDeMejoramiento' => $accionDeMejoramiento,
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing accionDeMejoramiento entity.
     *
     */
    public function editAction(Request $request, AccionDeMejoramiento $accionDeMejoramiento) {
        $deleteForm = $this->createDeleteForm($accionDeMejoramiento);
        $editForm = $this->createForm('LayerBundle\Form\AccionDeMejoramientoType', $accionDeMejoramiento);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('acciondemejoramiento_edit', array('id' => $accionDeMejoramiento->getId()));
        }

        return $this->render('acciondemejoramiento/edit.html.twig', array(
                    'accionDeMejoramiento' => $accionDeMejoramiento,
                    'edit_form' => $editForm->createView(),
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a accionDeMejoramiento entity.
     *
     */
    public function deleteAction(Request $request, AccionDeMejoramiento $accionDeMejoramiento) {
        $form = $this->createDeleteForm($accionDeMejoramiento);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($accionDeMejoramiento);
            $em->flush();
        }

        return $this->redirectToRoute('acciondemejoramiento_index');
    }

    /**
     * Creates a form to delete a accionDeMejoramiento entity.
     *
     * @param AccionDeMejoramiento $accionDeMejoramiento The accionDeMejoramiento entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(AccionDeMejoramiento $accionDeMejoramiento) {
        return $this->createFormBuilder()
                        ->setAction($this->generateUrl('acciondemejoramiento_delete', array('id' => $accionDeMejoramiento->getId())))
                        ->setMethod('DELETE')
                        ->getForm()
        ;
    }

    public function accionesDisponiblesAction(Request $r) {
        $em = $this->getDoctrine()->getManager();
        $accionesDisponibles = $em->getRepository('LayerBundle:AccionDeMejoramiento')->accionesDisponibles($r->get('suelo_id'))->getQuery()->getResult();

        return new \Symfony\Component\HttpFoundation\Response(json_encode($accionesDisponibles));
    }

}
