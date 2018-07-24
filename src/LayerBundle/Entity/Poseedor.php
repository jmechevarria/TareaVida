<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Poseedor
 *
 * @ORM\Table(name="poseedor")
 * @ORM\Entity
 */
class Poseedor {

    /**
     * @var string
     *
     * @ORM\Column(nullable=true)
     */
    private $identidad;

    /**
     * @var string
     *
     * @ORM\Column(nullable=true)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(nullable=true)
     */
    private $direccion;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     */
    private $sede;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     */
    private $tipopos;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     */
    private $sector;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     */
    private $rama;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     */
    private $subrama;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     */
    private $asociado;

    /**
     * @var string
     *
     * @ORM\Column(nullable=true)
     */
    private $fechacreacion;

    /**
     * @var string
     *
     * @ORM\Column(nullable=true)
     */
    private $fechacambio;

    /**
     * @var string
     *
     * @ORM\Column(name="mi_prinx", nullable=true)
     */
    private $miPrinx;

    /**
     * @var string
     *
     * @ORM\Column(nullable=true)
     */
    private $municipio;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="poseedor_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * Set identidad
     *
     * @param string $identidad
     * @return Poseedor
     */
    public function setIdentidad($identidad) {
        $this->identidad = $identidad;

        return $this;
    }

    /**
     * Get identidad
     *
     * @return string
     */
    public function getIdentidad() {
        return $this->identidad;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     * @return Poseedor
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
     * Set direccion
     *
     * @param string $direccion
     * @return Poseedor
     */
    public function setDireccion($direccion) {
        $this->direccion = $direccion;

        return $this;
    }

    /**
     * Get direccion
     *
     * @return string
     */
    public function getDireccion() {
        return $this->direccion;
    }

    /**
     * Set sede
     *
     * @param integer $sede
     * @return Poseedor
     */
    public function setSede($sede) {
        $this->sede = $sede;

        return $this;
    }

    /**
     * Get sede
     *
     * @return integer
     */
    public function getSede() {
        return $this->sede;
    }

    /**
     * Set tipopos
     *
     * @param integer $tipopos
     * @return Poseedor
     */
    public function setTipopos($tipopos) {
        $this->tipopos = $tipopos;

        return $this;
    }

    /**
     * Get tipopos
     *
     * @return integer
     */
    public function getTipopos() {
        return $this->tipopos;
    }

    /**
     * Set sector
     *
     * @param integer $sector
     * @return Poseedor
     */
    public function setSector($sector) {
        $this->sector = $sector;

        return $this;
    }

    /**
     * Get sector
     *
     * @return integer
     */
    public function getSector() {
        return $this->sector;
    }

    /**
     * Set rama
     *
     * @param integer $rama
     * @return Poseedor
     */
    public function setRama($rama) {
        $this->rama = $rama;

        return $this;
    }

    /**
     * Get rama
     *
     * @return integer
     */
    public function getRama() {
        return $this->rama;
    }

    /**
     * Set subrama
     *
     * @param integer $subrama
     * @return Poseedor
     */
    public function setSubrama($subrama) {
        $this->subrama = $subrama;

        return $this;
    }

    /**
     * Get subrama
     *
     * @return integer
     */
    public function getSubrama() {
        return $this->subrama;
    }

    /**
     * Set asociado
     *
     * @param integer $asociado
     * @return Poseedor
     */
    public function setAsociado($asociado) {
        $this->asociado = $asociado;

        return $this;
    }

    /**
     * Get asociado
     *
     * @return integer
     */
    public function getAsociado() {
        return $this->asociado;
    }

    /**
     * Set fechacreacion
     *
     * @param string $fechacreacion
     * @return Poseedor
     */
    public function setFechacreacion($fechacreacion) {
        $this->fechacreacion = $fechacreacion;

        return $this;
    }

    /**
     * Get fechacreacion
     *
     * @return string
     */
    public function getFechacreacion() {
        return $this->fechacreacion;
    }

    /**
     * Set fechacambio
     *
     * @param string $fechacambio
     * @return Poseedor
     */
    public function setFechacambio($fechacambio) {
        $this->fechacambio = $fechacambio;

        return $this;
    }

    /**
     * Get fechacambio
     *
     * @return string
     */
    public function getFechacambio() {
        return $this->fechacambio;
    }

    /**
     * Set miPrinx
     *
     * @param string $miPrinx
     * @return Poseedor
     */
    public function setMiPrinx($miPrinx) {
        $this->miPrinx = $miPrinx;

        return $this;
    }

    /**
     * Get miPrinx
     *
     * @return string
     */
    public function getMiPrinx() {
        return $this->miPrinx;
    }

    /**
     * Set municipio
     *
     * @param string $municipio
     * @return Poseedor
     */
    public function setMunicipio($municipio) {
        $this->municipio = $municipio;

        return $this;
    }

    /**
     * Get municipio
     *
     * @return string
     */
    public function getMunicipio() {
        return $this->municipio;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

}
