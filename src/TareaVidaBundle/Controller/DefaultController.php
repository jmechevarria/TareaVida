<?php

namespace TareaVidaBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller {

    /**
     * Función que obtiene los metadatos de las capas y grupos de capas y construye la estructura que se utiliza en la vista
     * para crear el árbol de capas
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getLayersMetadataAction() {
        $em = $this->getDoctrine()->getManager();

        //aquí se obtienen los grupos (de capas) que son raíces de su respectivo 'árbol', o sea que no tienen grupo padre
        $groups = $em->getRepository('TareaVidaBundle:LayerGroup')->findBy(array('parent' => null));

        //A LA HORA DE CREAR UN GRUPO NUEVO ES NECESARIO VERIFICAR QUE NO EXISTA RECURSIÓN INFINITA ENTRE GRUPOS
        //EJEMPLO: EVITAR QUE GRUPO 1 SEA PADRE DE GRUPO 2 Y, AL MISMO TIEMPO, GRUPO 2 SEA PADRE DE GRUPO 1

        $trees = array();
        foreach ($groups as $group) {
            $this->buildTree($group, $trees[$group->getFriendlyName()]);
        }

        //aquí se obtienen las capas que que no tienen grupo padre
        $layers = $em->getRepository('TareaVidaBundle:Layer')->findBy(array('parent' => null), array('zindex' => 'desc'));
        foreach ($layers as $layer) {
            $this->buildTree($layer, $trees[$layer->getFriendlyName()]);
        }

        return new \Symfony\Component\HttpFoundation\Response(json_encode($trees));
    }

    /**
     * Construye el árbol de capas
     *
     * @param type $root
     * @param type $tree
     */
    function buildTree($root, &$tree) {
        if (is_a($root, 'TareaVidaBundle\Entity\LayerGroup')) {
            if (count($root->getSubgroups()->toArray())) {
                foreach ($root->getSubgroups() as $subgroup) {
                    $this->buildTree($subgroup, $tree[$subgroup->getFriendlyName()]);
                }
            }
            if (count($root->getLayers()->toArray())) {
                foreach ($root->getLayers() as $layer) {
                    $this->buildTree($layer, $tree[$layer->getFriendlyName()]);
                }
            }
        } else {
            $this->getLayerProps($root, $tree);
        }
    }

    /**
     * Incluye las propiedades de la capa ($node) en la correspondiente 'hoja' ($leaf) del árbol de capas
     *
     * @param type $node
     * @param type $leaf
     */
    function getLayerProps($node, &$leaf) {
        $em = $this->getDoctrine()->getManager();
        $props = array();
        $layerMethods = array_values($em->getClassMetadata('TareaVidaBundle:Layer')->getReflectionClass()->getMethods());
        foreach ($layerMethods as $lm) {
            $methodName = $lm->getName();
            if (preg_match('/^get/', $methodName)) {
                if ($methodName !== 'getChildren') {
                    $propName = preg_replace('/^get/', '', $methodName);
                    $lmResult = $lm->invoke($node);
                    if ($methodName !== 'getParent')
                        $props[$propName] = $lmResult;
                    else if ($lmResult)//esta verificación es en caso que la capa no pertenezca a ningún grupo (padre = null)
                        $props[$propName] = $lmResult->getFriendlyName();
                    else
                        $props[$propName] = NULL;
                }
            }
        }

        $leaf = array_merge($props, array('IsLeaf' => true)/* dato adicional para identificar el tipo de nodo cuando se procese en JS */);
    }

}
