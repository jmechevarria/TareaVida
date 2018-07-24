<?php

namespace LayerBundle\Controller;

use LayerBundle\Entity\ParcelaAgricolaAfectada;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Parcelasagricolasafectada controller.
 *
 */
class ParcelaAgricolaAfectadaController extends Controller {

    /**
     * Lists all parcelasAgricolasAfectada entities.
     *
     */
    public function indexAction() {
        $em = $this->getDoctrine()->getManager();

        $ParcelaAgricolaAfectada = $em->getRepository('LayerBundle:ParcelaAgricolaAfectada')->findAll();

        return $this->render('ParcelaAgricolaAfectada/index.html.twig', array(
                    'ParcelaAgricolaAfectada' => $ParcelaAgricolaAfectada,
        ));
    }

    /**
     * Creates a new parcelasAgricolasAfectada entity.
     *
     */
    public function newAction(Request $request) {
        $parcelasAgricolasAfectada = new Parcelasagricolasafectada();
        $form = $this->createForm('LayerBundle\Form\ParcelaAgricolaAfectadaType', $parcelasAgricolasAfectada);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($parcelasAgricolasAfectada);
            $em->flush();

            return $this->redirectToRoute('ParcelaAgricolaAfectada_show', array('gid' => $parcelasAgricolasAfectada->getGid()));
        }

        return $this->render('ParcelaAgricolaAfectada/new.html.twig', array(
                    'parcelasAgricolasAfectada' => $parcelasAgricolasAfectada,
                    'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a parcelasAgricolasAfectada entity.
     *
     */
    public function showAction(ParcelaAgricolaAfectada $parcelasAgricolasAfectada) {
        $deleteForm = $this->createDeleteForm($parcelasAgricolasAfectada);

        return $this->render('ParcelaAgricolaAfectada/show.html.twig', array(
                    'parcelasAgricolasAfectada' => $parcelasAgricolasAfectada,
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing parcelasAgricolasAfectada entity.
     *
     */
    public function editAction(Request $request, ParcelaAgricolaAfectada $parcelasAgricolasAfectada) {
        $deleteForm = $this->createDeleteForm($parcelasAgricolasAfectada);
        $editForm = $this->createForm('LayerBundle\Form\ParcelaAgricolaAfectadaType', $parcelasAgricolasAfectada);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('ParcelaAgricolaAfectada_edit', array('gid' => $parcelasAgricolasAfectada->getGid()));
        }

        return $this->render('ParcelaAgricolaAfectada/edit.html.twig', array(
                    'parcelasAgricolasAfectada' => $parcelasAgricolasAfectada,
                    'edit_form' => $editForm->createView(),
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a parcelasAgricolasAfectada entity.
     *
     */
    public function deleteAction(Request $request, ParcelaAgricolaAfectada $parcelasAgricolasAfectada) {
        $form = $this->createDeleteForm($parcelasAgricolasAfectada);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($parcelasAgricolasAfectada);
            $em->flush();
        }

        return $this->redirectToRoute('ParcelaAgricolaAfectada_index');
    }

    /**
     * Creates a form to delete a parcelasAgricolasAfectada entity.
     *
     * @param ParcelaAgricolaAfectada $parcelasAgricolasAfectada The parcelasAgricolasAfectada entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(ParcelaAgricolaAfectada $parcelasAgricolasAfectada) {
        return $this->createFormBuilder()
                        ->setAction($this->generateUrl('ParcelaAgricolaAfectada_delete', array('gid' => $parcelasAgricolasAfectada->getGid())))
                        ->setMethod('DELETE')
                        ->getForm()
        ;
    }

    /**
     * Cantidad de áreas afectadas por tipo de uso
     */
    public function parcelasAfectadasTipoUsoAction() {
        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('LayerBundle:ParcelaAgricolaAfectada')->findAll();
        $tiposuso = $em->getRepository('LayerBundle:TipoUso')->findAll();

        $municipios = array(
            'TOTAL' => array()
        );

        $parcelasPorTipoUso = array();

        foreach ($tiposuso as $tu) {
            $nombreTipoUso = $tu->getNombre();
            foreach ($entities as $e) {
                $municipio = $e->getMunicipioNombre();
                if ($municipio === 'SAGUA LA GRANDE' || $municipio === 'CAIBARIEN' ||
                        $municipio === 'Encrucijada' || $municipio === 'CAMAJUANÍ') {
                    if ($tu->getTipouso() === $e->getTipouso() &&
                            $tu->getTiposup() === $e->getTiposup() &&
                            $tu->getEspuso() === $e->getEspuso()) {
                        if (!isset($municipios[$municipio]))
                            $municipios[$municipio] = array();

                        if (!isset($municipios[$municipio][$nombreTipoUso])) {
                            $municipios[$municipio][$nombreTipoUso] = 0;
                        }

                        if (!isset($municipios['TOTAL'][$nombreTipoUso])) {
                            $municipios['TOTAL'][$nombreTipoUso] = 0;
                        }

                        $municipios[$municipio][$nombreTipoUso] += ($e->getArea() / 10000);
                        $municipios['TOTAL'][$nombreTipoUso] += ($e->getArea() / 10000);

                        if (!isset($parcelasPorTipoUso[$nombreTipoUso])) {
                            $parcelasPorTipoUso[$nombreTipoUso] = array();
                        }

                        $parcelasPorTipoUso[$nombreTipoUso][] = $e->getGid();
                    }
                }
            }
        }

        //ordenar los resultados por área descendentemente
        foreach ($municipios as $k => $m) {
            arsort($municipios[$k]);
        }

        return new \Symfony\Component\HttpFoundation\Response(json_encode(array($municipios, $parcelasPorTipoUso)));
    }

    /**
     * Cantidad de área afectada por usufructuario
     */
    public function usufructuariosAfectadosAction() {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository('LayerBundle:ParcelaAgricolaAfectada');
        $results = $repo->findByUsufructo()->getQuery()->getResult();
//        var_dump($entities);
//        die();
        $final['TOTAL'] = array('usufructos' => 0, 'area' => 0);

        foreach ($results as $r) {
            $municipio = $r['municipioNombre'];

            $final[$municipio] = array('usufructos' => $r['usufructos'], 'area' => $r['area']);
            $final['TOTAL']['usufructos'] += $r['usufructos'];
            $final['TOTAL']['area'] += $r['area'];
        }

//        var_dump($final);
//        die();
        return new \Symfony\Component\HttpFoundation\Response(json_encode($final));
    }

    /**
     * Cantidad de áreas afectadas por categoría agroproductiva
     */
    public function afectacionesFormaProductivaAction() {
        $em = $this->getDoctrine()->getManager();
        $repoParcelas = $em->getRepository('LayerBundle:ParcelaAgricolaAfectada');
//        $repoPoseedor = $em->getRepository('LayerBundle:Poseedor');

        $codigos = array('72563' => 'CCS', '72595' => 'UBPC', '72552' => 'CPA');
        $afectaciones = $repoParcelas->findByFormaProductiva($codigos)->getQuery()->getResult();

        $results;

        foreach ($afectaciones as $a) {
            $municipio = $a['municipio'];
            $nombre = $a['nombre'];
            $idFormaProd = $a['idFormaProd'];
            $tipoFormaProd = $codigos[substr($idFormaProd, 0, 5)];
            $datos = array('nombre' => $nombre, 'area' => $a['area'], 'idFormaProd' => $idFormaProd);

            $results['TOTAL']['TOTAL'][] = $datos;
            $results['TOTAL'][$tipoFormaProd][] = $datos;
            $results[$municipio]['TOTAL'][] = $datos;
            $results[$municipio][$tipoFormaProd][] = $datos;
        }

        //colocar los datos de TOTAL al final del arreglo
//        $firstPair = array_splice($results, 0, 1);
//        $results = array_merge($results, $firstPair);
//
        //asignar un arreglo vacío en los lugares donde no haya datos. Ej: cuando un municipio no posea algún tipo de forma productiva
        //rellenar estos lugares vacíos hace más fácil el trabajo en la vista
        foreach ($results as $municipio => $formasProd) {
            foreach ($codigos as $c) {
                if (!isset($formasProd[$c])) {
                    $results[$municipio][$c] = array();
                }
            }
        }
//        var_dump($results);
//        die();
        return new \Symfony\Component\HttpFoundation\Response(json_encode($results));
    }

    /**
     * Obtener el tipo de uso y las acciones de la parcela seleccionada
     * Estas informaciones se obtienen en la misma acción para realizar una sola llamada ajax, aunque en realidad pertenezcan a
     * entidades diferentes (Poseedor y SueloAfectado)
     *
     * @param \Symfony\Component\HttpFoundation\Request $r
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function interaccionParcelaAfectadaAction(Request $r) {
        $em = $this->getDoctrine()->getManager();
        $poseedor = $em->getRepository('LayerBundle:Poseedor')->findBy(
                array('identidad' => $r->get('poseedor'))
        );

        $suelosIntersectados = $r->get('suelos_intersectados');
        $acciones = array();
        if ($suelosIntersectados)
            $acciones = $em->getRepository('LayerBundle:SueloAfectado')->findByIDs($suelosIntersectados)->getQuery()->getResult();

        $results = array_merge(
                array('poseedor' => $poseedor[0]->getNombre()), array('acciones' => $acciones)
        );
        return new \Symfony\Component\HttpFoundation\Response(json_encode($results));
    }

}
