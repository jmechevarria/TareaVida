<?php

namespace LayerBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * SueloAfectadoRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class AccionSueloRepository extends EntityRepository {

    /**
     * Consulta DQL para encontrar las acciones correspondientes a una parcela de suelo
     *
     * SQL equivalente:
     *
     * <b>select accion.id, accion.nombre, asociacion.hecho
     * from accion_suelo as asociacion
     * inner join accion_de_mejoramiento as accion on (asociacion.accion_id = accion.id)
     * where suelo_id=<$suelo>
     * order by accion.nombre</b>
     *
     * @param type $suelo
     * @return type
     */
    public function buscarAcciones($suelo) {
        $qb = $this->createQueryBuilder('asociacion');
        $qb->select('accion.id, accion.nombre, asociacion.hecho')
                ->innerJoin('asociacion.accion', 'accion')
                ->where($qb->expr()->eq(':suelo', 'asociacion.suelo'))
                ->orderBy('accion.nombre')
                ->setParameter('suelo', $suelo)
        ;

        return $qb;
    }

    /**
     * Consulta DQL para encontrar las acciones NO asociadas a una parcela de suelo
     *
     * SQL equivalente:
     *
     * <b>select accion_de_mejoramiento.id from accion_de_mejoramiento
     * where accion_de_mejoramiento.id not in
     * (select accion_suelo.accion_id from accion_suelo where suelo_id=<$suelo>)
     * </b>
     *
     * @param type $suelo
     * @param type $asociadas
     * @return type
     */
    public function buscarAccionesNoAsociadas($suelo) {
        $sqb = $this->createQueryBuilder('asociacion');

        $sqb->select('IDENTITY(asociacion.accion)')
                ->where($sqb->expr()->eq(':suelo', 'asociacion.suelo'))
                ->setParameter('suelo', $suelo)
        ;

        $qb = $this->getEntityManager()->getRepository('LayerBundle:AccionDeMejoramiento')->createQueryBuilder('accion');
        $qb->select('accion.id, accion.nombre')
                ->where($qb->expr()->notIn('accion.id', $sqb->getQuery()->getDQL()))
                ->setParameter('suelo', $suelo)
        ;
        return $qb;
    }

}
