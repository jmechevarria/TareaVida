<?php

namespace LayerBundle\Controller;

use LayerBundle\Entity\SueloAfectado;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Sueloafectado controller.
 *
 */
class SueloAfectadoController extends Controller {

    /**
     * Lists all sueloAfectado entities.
     *
     */
    public function indexAction() {
        $em = $this->getDoctrine()->getManager();

        $sueloAfectados = $em->getRepository('LayerBundle:SueloAfectado')->findAll();

        return $this->render('sueloafectado/index.html.twig', array(
                    'sueloAfectados' => $sueloAfectados,
        ));
    }

    /**
     * Creates a new sueloAfectado entity.
     *
     */
    public function newAction(Request $request) {
        $sueloAfectado = new Sueloafectado();
        $form = $this->createForm('LayerBundle\Form\SueloAfectadoType', $sueloAfectado);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($sueloAfectado);
            $em->flush();

            return $this->redirectToRoute('sueloafectado_show', array('gid' => $sueloAfectado->getGid()));
        }

        return $this->render('sueloafectado/new.html.twig', array(
                    'sueloAfectado' => $sueloAfectado,
                    'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a sueloAfectado entity.
     *
     */
    public function showAction(SueloAfectado $sueloAfectado) {
        $deleteForm = $this->createDeleteForm($sueloAfectado);

        return $this->render('sueloafectado/show.html.twig', array(
                    'sueloAfectado' => $sueloAfectado,
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing sueloAfectado entity.
     *
     */
    public function editAction(Request $request, SueloAfectado $sueloAfectado) {
        $deleteForm = $this->createDeleteForm($sueloAfectado);
        $editForm = $this->createForm('LayerBundle\Form\SueloAfectadoType', $sueloAfectado);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('sueloafectado_edit', array('gid' => $sueloAfectado->getGid()));
        }

        return $this->render('sueloafectado/edit.html.twig', array(
                    'sueloAfectado' => $sueloAfectado,
                    'edit_form' => $editForm->createView(),
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a sueloAfectado entity.
     *
     */
    public function deleteAction(Request $request, SueloAfectado $sueloAfectado) {
        $form = $this->createDeleteForm($sueloAfectado);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($sueloAfectado);
            $em->flush();
        }

        return $this->redirectToRoute('sueloafectado_index');
    }

    /**
     * Creates a form to delete a sueloAfectado entity.
     *
     * @param SueloAfectado $sueloAfectado The sueloAfectado entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(SueloAfectado $sueloAfectado) {
        return $this->createFormBuilder()
                        ->setAction($this->generateUrl('sueloafectado_delete', array('gid' => $sueloAfectado->getGid())))
                        ->setMethod('DELETE')
                        ->getForm()
        ;
    }

    /**
     * Cantidad de áreas afectadas por categoría agroproductiva
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function agroprodSuelosAction() {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository('LayerBundle:SueloAfectado');
        $entities = $repo->findAll();

        $cat = array(
            'TOTAL' => array(1 => 0, 2 => 0, 3 => 0, 4 => 0)
        );

        foreach ($entities as $e) {
            $municipio = $e->getMunicipio();
            if ($municipio === 'Sagua la Grande' || $municipio === 'Caibarién' ||
                    $municipio === 'Encrucijada' || $municipio === 'Camajuaní') {
                $area = $e->getArea();
                if (!isset($cat[$municipio]))
                    $cat[$municipio] = array(1 => 0, 2 => 0, 3 => 0, 4 => 0);

                if ($e->getCatgral10cult() >= 1 && $e->getCatgral10cult() < 2) {
                    $cat[$municipio][1] += $area;
                    $cat['TOTAL'][1] += $area;
                } else if ($e->getCatgral10cult() >= 2 && $e->getCatgral10cult() < 3) {
                    $cat[$municipio][2] += $area;
                    $cat['TOTAL'][2] += $area;
                } else if ($e->getCatgral10cult() >= 3 && $e->getCatgral10cult() < 3.7) {
                    $cat[$municipio][3] += $area;
                    $cat['TOTAL'][3] += $area;
                } else {
                    $cat[$municipio][4] += $area;
                    $cat['TOTAL'][4] += $area;
                }
            }
        }

        return new \Symfony\Component\HttpFoundation\Response(json_encode($cat));
    }

    /**
     *
     * Mostrar, actualizar y eliminar las acciones de mejoramiento correspondientes a la parcela de suelo seleccionada.
     *
     * @param \Symfony\Component\HttpFoundation\Request $r
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function gestionarAccionesAction(Request $r) {
        $em = $this->getDoctrine()->getManager();
        if ($r->getMethod() === 'POST') {
            $asociaciones = $em->getRepository('LayerBundle:AccionSuelo')->findBy(array('suelo' => $r->get('suelo')));
            $f = 0;
            $t = 0;
            foreach ($asociaciones as $a) {
                if ($r->get('acciones')[$a->getAccion()->getId()] === 'false')
                    $a->setHecho(false);
                else
                    $a->setHecho(true);
//                if ($a->getHecho())
//                    $t++;
//                else
//                    $f++;
//                var_dump($r->get('acciones')[$a->getAccion()->getId()]);
//                var_dump($a->getAccion()->getNombre() . ' ' . $a->getHecho());
            }
//            var_dump($t);
//            var_dump($f);
//            die();
//            die();
//
            $em->flush();

            return new \Symfony\Component\HttpFoundation\Response();

//            $em->getRepository('LayerBundle:AccionSuelo')->actualizarAcciones($r->get('suelo'), $r->get(acciones));
        } else {
            $acciones = $em->getRepository('LayerBundle:AccionSuelo')->buscarAcciones($r->get('suelo'))->getQuery()->getResult();

            return new \Symfony\Component\HttpFoundation\Response(json_encode($acciones));
        }
//        var_dump($acciones);
//        die();
    }

}
