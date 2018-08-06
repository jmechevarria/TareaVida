<?php

namespace LayerBundle\Controller;

use LayerBundle\Entity\AccionSuelo;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * AccionSuelo controller.
 *
 */
class AccionSueloController extends Controller {

    public function asociarAccionSueloAction(Request $r) {
        $em = $this->getDoctrine()->getManager();
        $accionSuelo = new AccionSuelo();
        $accion = $em->getRepository('LayerBundle:AccionDeMejoramiento')->find($r->get('accion_id'));
        if ($accion) {
            $accionSuelo->setAccion($accion);
            $suelo = $em->getRepository('LayerBundle:SueloAfectado')->find($r->get('suelo_id'));
            if ($suelo) {
                $accionSuelo->setSuelo($suelo);
                $em->persist($accionSuelo);
                $em->flush();

                return new \Symfony\Component\HttpFoundation\Response();
            }
            return new \Symfony\Component\HttpFoundation\Response('Suelo afectado con gid ' . $r->get('suelo_id') . ' no encontrado.', 300);
        }
        return new \Symfony\Component\HttpFoundation\Response('Acción con id ' . $r->get('accion_id') . ' no encontrada.', 300);
    }

}
