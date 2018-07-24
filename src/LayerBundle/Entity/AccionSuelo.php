<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AccionSuelo
 *
 * @ORM\Table(name="accion_suelo")
 * @ORM\Entity(repositoryClass="LayerBundle\Repository\AccionSueloRepository")
 */
class AccionSuelo {

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="AccionDeMejoramiento", inversedBy="asociacionAccionSuelo")
     * @ORM\JoinColumn(name="accion_id", referencedColumnName="id")
     */
    private $accion;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="SueloAfectado", inversedBy="asociacionAccionSuelo")
     * @ORM\JoinColumn(name="suelo_id", referencedColumnName="gid")
     */
    private $suelo;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    private $hecho;

    /**
     * Set hecho
     *
     * @param boolean $hecho
     * @return AccionSuelo
     */
    public function setHecho($hecho) {
        $this->hecho = $hecho;

        return $this;
    }

    /**
     * Get hecho
     *
     * @return boolean
     */
    public function getHecho() {
        return $this->hecho;
    }

    /**
     * Set accion
     *
     * @param \LayerBundle\Entity\AccionDeMejoramiento $accion
     * @return AccionSuelo
     */
    public function setAccion(\LayerBundle\Entity\AccionDeMejoramiento $accion) {
        $this->accion = $accion;

        return $this;
    }

    /**
     * Get accion
     *
     * @return \LayerBundle\Entity\AccionDeMejoramiento
     */
    public function getAccion() {
        return $this->accion;
    }

    /**
     * Set suelo
     *
     * @param \LayerBundle\Entity\SueloAfectado $suelo
     * @return AccionSuelo
     */
    public function setSuelo(\LayerBundle\Entity\SueloAfectado $suelo) {
        $this->suelo = $suelo;

        return $this;
    }

    /**
     * Get suelo
     *
     * @return \LayerBundle\Entity\SueloAfectado
     */
    public function getSuelo() {
        return $this->suelo;
    }

}
