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
        if ($r->isXmlHttpRequest()) {
            $em = $this->getDoctrine()->getManager();
            if ($r->getMethod() === 'POST') {
                $suelo_id = $r->get('suelo');
                $asociaciones = $em->getRepository('LayerBundle:AccionSuelo')->findBy(array('suelo' => $suelo_id));

                $accionesActualizadas = $r->get('acciones');

                foreach ($asociaciones as $a) {
                    $accion_id = $a->getAccion()->getId();
                    //si $accion_id se mantiene en las acciones
                    if (key_exists($accion_id, $accionesActualizadas)) {
                        if ($accionesActualizadas[$accion_id][0] === 'true')
                            $a->setHecho(true);
                        else
                            $a->setHecho(false);
                        //se elimina del arreglo de acciones actualizadas para no duplicarla
                        //cuando se use este arreglo para crear las acciones nuevas
                        unset($accionesActualizadas[$accion_id]);
                    } else {//si no, se elimina
                        $em->remove($a);
                    }
                }

                $suelo = $em->getRepository('LayerBundle:SueloAfectado')->find($suelo_id);
                //las acciones que quedaron en el arreglo de acciones actualizadas se
                //persisten en la base de datos
                foreach ($accionesActualizadas as $id => $props) {
                    $asociacion = new \LayerBundle\Entity\AccionSuelo();
                    $asociacion->setHecho($props[0]/* true or false */);
                    $asociacion->setAccion($em->getRepository('LayerBundle:AccionDeMejoramiento')->find($id));
                    $asociacion->setSuelo($suelo);
                    $em->persist($asociacion);
                }

                $em->flush();

                return new \Symfony\Component\HttpFoundation\Response();
            } else {
                $accionesAsociadas = $em->getRepository('LayerBundle:AccionSuelo')->buscarAcciones($r->get('suelo'))->getQuery()->getResult();
                $accionesNoAsociadas = $em->getRepository('LayerBundle:AccionSuelo')->buscarAccionesNoAsociadas($r->get('suelo'))->getQuery()->getResult();

                return new \Symfony\Component\HttpFoundation\Response(json_encode(array($accionesAsociadas, $accionesNoAsociadas)));
            }
        }
    }

}
