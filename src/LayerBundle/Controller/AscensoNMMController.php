<?php

namespace LayerBundle\Controller;

use LayerBundle\Entity\AscensoNMM;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Ascensonmm controller.
 *
 */
class AscensoNMMController extends Controller {

    /**
     * Lists all ascensoNMM entities.
     *
     */
    public function indexAction() {
        $em = $this->getDoctrine()->getManager();

        $ascensoNMMs = $em->getRepository('LayerBundle:AscensoNMM')->findAll();

        return $this->render('ascensonmm/index.html.twig', array(
                    'ascensoNMMs' => $ascensoNMMs,
        ));
    }

    /**
     * Creates a new ascensoNMM entity.
     *
     */
    public function newAction(Request $request) {
        $ascensoNMM = new Ascensonmm();
        $form = $this->createForm('LayerBundle\Form\AscensoNMMType', $ascensoNMM);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($ascensoNMM);
            $em->flush();

            return $this->redirectToRoute('layer_ascensonmm_show', array('gid' => $ascensoNMM->getGid()));
        }

        return $this->render('ascensonmm/new.html.twig', array(
                    'ascensoNMM' => $ascensoNMM,
                    'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a ascensoNMM entity.
     *
     */
    public function showAction(AscensoNMM $ascensoNMM) {
        $deleteForm = $this->createDeleteForm($ascensoNMM);

        return $this->render('ascensonmm/show.html.twig', array(
                    'ascensoNMM' => $ascensoNMM,
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing ascensoNMM entity.
     *
     */
    public function editAction(Request $request, AscensoNMM $ascensoNMM) {
        $deleteForm = $this->createDeleteForm($ascensoNMM);
        $editForm = $this->createForm('LayerBundle\Form\AscensoNMMType', $ascensoNMM);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('layer_ascensonmm_edit', array('gid' => $ascensoNMM->getGid()));
        }

        return $this->render('ascensonmm/edit.html.twig', array(
                    'ascensoNMM' => $ascensoNMM,
                    'edit_form' => $editForm->createView(),
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a ascensoNMM entity.
     *
     */
    public function deleteAction(Request $request, AscensoNMM $ascensoNMM) {
        $form = $this->createDeleteForm($ascensoNMM);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($ascensoNMM);
            $em->flush();
        }

        return $this->redirectToRoute('layer_ascensonmm_index');
    }

    /**
     * Creates a form to delete a ascensoNMM entity.
     *
     * @param AscensoNMM $ascensoNMM The ascensoNMM entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(AscensoNMM $ascensoNMM) {
        return $this->createFormBuilder()
                        ->setAction($this->generateUrl('layer_ascensonmm_delete', array('gid' => $ascensoNMM->getGid())))
                        ->setMethod('DELETE')
                        ->getForm()
        ;
    }

    /**
     * Devuelve los años (diferentes) actualmente comprendidos en la tabla ascenso_nmm
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function listaAnnosAction() {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository('LayerBundle:AscensoNMM');
        $result = $repo->findAnnos()->getQuery()->getResult();

        return new \Symfony\Component\HttpFoundation\Response(json_encode($result));
    }

}
