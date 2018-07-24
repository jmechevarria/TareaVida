<?php

namespace LayerBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller {

    public function indexAction() {
        $em = $this->getDoctrine()->getManager();
        $suelos = $em->getRepository('LayerBundle:SueloAfectado')->findAll();

//CREAR LA TABLA factor_limitante CON LOS DATOS INICIALES DEFECTUOSOS
//
//        $factores = array();
//        foreach ($suelos as $s) {
//            $factores = array_merge($factores, explode('_', $s->getTempFactorLimitante()));
//        }
//        $factores = array_unique($factores);
//        sort($factores);
//
//        foreach ($factores as $f) {
//            $new = new \LayerBundle\Entity\FactorLimitante();
//            $new->setNombre($f);
//            $em->persist($new);
//        }
        ;
        //INSERTAR MANUALMENTE LOS NOMBRES CORRECTOS DE CADA FILA EN LA TABLA factor_limitante
        //Insertando manualmente los nombres. Espere, por favor............................☺
        ;
        //ACTUALIZAR LA COLUMNA factor_limitante EN LA TABLA suelo_afectado CON LOS VALORES CORRECTOS INSERTADOS ANTERIORMENTE
//        $factores = $em->getRepository('LayerBundle:FactorLimitante')->findAll();
//
//        $nombres = array();
//        foreach ($factores as $f) {
//            $nombres[$f->getNombre()] = $f->getNombreCorrecto();
//        }
//
//        foreach ($suelos as $e) {
//            $valorInicial = $e->getTempFactorLimitante();
//            if (!empty($valorInicial) && $valorInicial !== 'REVISAR') {
//                $valorInicial = explode('_', $valorInicial);
//                foreach ($valorInicial as $k => $v) {
//                    if (!empty($v))
//                        $valorInicial[$k] = $nombres[$v];
//                }
//                $e->setTempFactorLimitante(implode('_', $valorInicial));
//            }
//        }
//
        ;
        //ELIMINAR FILAS CON LA COLUMNA nombre_correcto DUPLICADA EN LA TABLA factor_limitante
        //Y ASIGNAR EL VALOR DE nombre_correcto A nombre, PARA POSTERIORMENTE ELIMINAR nombre_correcto
//        $existe = array();
//
//        foreach ($factores as $f) {
//            if (isset($existe[$f->getNombreCorrecto()])) {
//                $em->remove($f);
//            } else {
//                $existe[$f->getNombreCorrecto()] = true;
//                $f->setNombre($f->getNombreCorrecto());
//            }
//        }
        ;
        //CREAR LAS RELACIONES MUCHOS-A-MUCHOS GENERADAS A PARTIR DE suelo_afectado.factor_limitante Y factor_limitante.nombre
//        foreach ($factores as $k => $f) {
//            $nombre = $f->getNombre();
//
//            foreach ($suelos as $s) {
//                if (substr_count($s->getTempFactorLimitante(), $nombre) > 0) {
//                    $f->addSueloAfectado($s);
//                }
//            }
//        }
        ;
        //ELIMINAR LA COLUMNA factor_limitante DE LA TABLA suelo_afectado
        //SE PUEDE HACER EN LA BASE DE DATOS DIRECTAMENTE
        //O
        //ELIMINANDO EL ATRIBUTO tempFactorLimitante DE LA ENTIDAD SueloAfectado Y php console doctrine:schema:update --complete --force
        ;
        //CREAR LA TABLA accion_de_mejoramiento CON LOS DATOS INICIALES DEFECTUOSOS
//        $acciones = array();
//        foreach ($suelos as $e) {
//            $acciones = array_merge($acciones, explode('_', $e->getAccionesDeMejoramiento()));
//        }
//        $acciones = array_unique($acciones);
//        sort($acciones);
////        var_dump($acciones);
////        die();
//        foreach ($acciones as $f) {
//            $new = new \LayerBundle\Entity\AccionSuelo();
//            $new->setNombre($f);
//            $em->persist($new);
//        }
        ;
        //INSERTAR MANUALMENTE LOS NOMBRES CORRECTOS DE CADA FILA EN LA TABLA accion_de_mejoramiento
        //Insertando manualmente los nombres. Espere, por favor............................☺
        ;
        //ACTUALIZAR LA COLUMNA accion_de_mejoramiento EN LA TABLA suelo_afectado CON LOS VALORES CORRECTOS INSERTADOS ANTERIORMENTE
//        $acciones = $em->getRepository('LayerBundle:AccionDeMejoramiento')->findAll();
//        $nombres = array();
//        foreach ($acciones as $m) {
//            $nombres[$m->getNombre()] = $m->getNombreCorrecto();
//        }
//
//        foreach ($suelos as $s) {
//            $valorInicial = $s->getTempAccionDeMejoramiento();
//            if (!empty($valorInicial)) {
//                $temp[$s->getGid()] = array($valorInicial);
//                $valorInicial = explode('_', $valorInicial);
//                foreach ($valorInicial as $k => $v) {
//                    if (!empty($v))
//                        $valorInicial[$k] = $nombres[$v];
//                }
//                $temp[$s->getGid()][] = implode('_', $valorInicial);
//
//                $s->setTempAccionDeMejoramiento(implode('_', $valorInicial));
//            }
//        }
        ;
        //ELIMINAR FILAS CON LA COLUMNA nombre_correcto DUPLICADA EN LA TABLA accion_de_mejoramiento
        //Y ASIGNAR EL VALOR DE nombre_correcto A nombre, PARA POSTERIORMENTE ELIMINAR nombre_correcto
//        $existe = array();
//
//        foreach ($acciones as $m) {
//            if (isset($existe[$m->getNombreCorrecto()])) {
//                $em->remove($m);
//            } else {
//                $existe[$m->getNombreCorrecto()] = true;
//                $m->setNombre($m->getNombreCorrecto());
//            }
//        }
        ;
        //ELIMINAR LA COLUMNA nombre_correcto DE LA TABLA accion_de_mejoramiento
        //SE PUEDE HACER EN LA BASE DE DATOS DIRECTAMENTE
        //O
        //ELIMINANDO EL ATRIBUTO nombreCorrecto DE LA ENTIDAD AccionDeMejoramiento Y php console doctrine:schema:update --complete --force
        ;

        //CREAR LAS RELACIONES MUCHOS-A-MUCHOS GENERADAS A PARTIR DE suelo_afectado.factor_limitante Y factor_limitante.nombre
//        foreach ($acciones as $k => $m) {
//            $nombre = $m->getNombre();
//
//            foreach ($suelos as $s) {
//                if (substr_count($s->getTempAccionDeMejoramiento(), $nombre) > 0) {
//                    $m->addSueloAfectado($s);
//                }
//            }
//        }
        ;
        //ELIMINAR LA COLUMNA accion_de_mejoramiento DE LA TABLA suelo_afectado
        //SE PUEDE HACER EN LA BASE DE DATOS DIRECTAMENTE
        //O
        //ELIMINANDO EL ATRIBUTO tempAccionDeMejoramiento DE LA ENTIDAD SueloAfectado Y php console doctrine:schema:update --complete --force
        ;
        $em->flush();

        return $this->render('LayerBundle:Default:index.html.twig');
    }

}
