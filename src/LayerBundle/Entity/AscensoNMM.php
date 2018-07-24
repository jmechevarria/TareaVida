<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AscensoNMM
 *
 * @ORM\Table(name="ascenso_nmm", indexes={@ORM\Index(name="sidx_ascenso_nmm_geom", columns={"geom"})})
 * @ORM\Entity(repositoryClass="LayerBundle\Repository\AscensoNMMRepository")
 */
class AscensoNMM {

    /**
     * @var geometry
     *
     * @ORM\Column(type="geometry", options={"geometry_type"="MULTIPOLYGON", "srid"=3795})
     */
    private $geom;

    /**
     * @var string
     *
     * @ORM\Column()
     */
    private $municipio;

    /**
     * @var float
     *
     * @ORM\Column(type="float", precision=10, scale=0)
     */
    private $area;

    /**
     * @var float
     *
     * @ORM\Column(name="distancia_ascenso", type="float", precision=10, scale=0, nullable=true)
     */
    private $distanciaAscenso;

    /**
     * @var integer
     *
     * @ORM\Column(name="year_ascenso", type="integer", nullable=true)
     */
    private $yearAscenso;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="ascenso_nmm_gid_seq", allocationSize=1, initialValue=1)
     */
    private $gid;

    /**
     * Set geom
     *
     * @param geometry $geom
     * @return AscensoNMM
     */
    public function setGeom($geom) {
        $this->geom = $geom;

        return $this;
    }

    /**
     * Get geom
     *
     * @return geometry
     */
    public function getGeom() {
        return $this->geom;
    }

    /**
     * Set municipio
     *
     * @param string $municipio
     * @return AscensoNMM
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
     * Set area
     *
     * @param float $area
     * @return AscensoNMM
     */
    public function setArea($area) {
        $this->area = $area;

        return $this;
    }

    /**
     * Get area
     *
     * @return float
     */
    public function getArea() {
        return $this->area;
    }

    /**
     * Set distanciaAscenso
     *
     * @param float $distanciaAscenso
     * @return AscensoNMM
     */
    public function setDistanciaAscenso($distanciaAscenso) {
        $this->distanciaAscenso = $distanciaAscenso;

        return $this;
    }

    /**
     * Get distanciaAscenso
     *
     * @return float
     */
    public function getDistanciaAscenso() {
        return $this->distanciaAscenso;
    }

    /**
     * Set yearAscenso
     *
     * @param integer $yearAscenso
     * @return AscensoNMM
     */
    public function setYearAscenso($yearAscenso) {
        $this->yearAscenso = $yearAscenso;

        return $this;
    }

    /**
     * Get yearAscenso
     *
     * @return integer
     */
    public function getYearAscenso() {
        return $this->yearAscenso;
    }

    /**
     * Get gid
     *
     * @return integer
     */
    public function getGid() {
        return $this->gid;
    }

}
