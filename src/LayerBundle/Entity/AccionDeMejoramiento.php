<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AccionDeMejoramiento
 *
 * @ORM\Table(name="accion_de_mejoramiento")
 * @ORM\Entity(repositoryClass="LayerBundle\Repository\AccionDeMejoramientoRepository")
 */
class AccionDeMejoramiento {

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="accion_de_mejoramiento_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column()
     */
    private $nombre;

    /**
     *
     * @ORM\OneToMany(targetEntity="AccionSuelo", mappedBy="accion")
     */
    private $asociacionAccionSuelo;

    /**
     * Set nombre
     *
     * @param string $nombre
     * @return AccionDeMejoramiento
     */
    public function setNombre($nombre) {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get nombre
     *
     * @return string
     */
    public function getNombre() {
        return $this->nombre;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Constructor
     */
    public function __construct() {
        $this->sueloAfectado = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add sueloAfectado
     *
     * @param \LayerBundle\Entity\SueloAfectado $sueloAfectado
     * @return AccionDeMejoramiento
     */
    public function addSueloAfectado(\LayerBundle\Entity\SueloAfectado $sueloAfectado) {
        $this->sueloAfectado[] = $sueloAfectado;

        return $this;
    }

    /**
     * Remove sueloAfectado
     *
     * @param \LayerBundle\Entity\SueloAfectado $sueloAfectado
     */
    public function removeSueloAfectado(\LayerBundle\Entity\SueloAfectado $sueloAfectado) {
        $this->sueloAfectado->removeElement($sueloAfectado);
    }

    /**
     * Get sueloAfectado
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSueloAfectado() {
        return $this->sueloAfectado;
    }

    /**
     * Add asociacionAccionSuelo
     *
     * @param \LayerBundle\Entity\AccionSuelo $asociacionAccionSuelo
     * @return AccionDeMejoramiento
     */
    public function addAsociacionAccionSuelo(\LayerBundle\Entity\AccionSuelo $asociacionAccionSuelo) {
        $this->asociacionAccionSuelo[] = $asociacionAccionSuelo;

        return $this;
    }

    /**
     * Remove asociacionAccionSuelo
     *
     * @param \LayerBundle\Entity\AccionSuelo $asociacionAccionSuelo
     */
    public function removeAsociacionAccionSuelo(\LayerBundle\Entity\AccionSuelo $asociacionAccionSuelo) {
        $this->asociacionAccionSuelo->removeElement($asociacionAccionSuelo);
    }

    /**
     * Get asociacionAccionSuelo
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAsociacionAccionSuelo() {
        return $this->asociacionAccionSuelo;
    }

}
