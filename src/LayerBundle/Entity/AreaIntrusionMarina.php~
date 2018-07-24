<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AreaIntrusionMarina
 *
 * @ORM\Table(name="area_intrusion_marina", indexes={@ORM\Index(name="sidx_area_intrusion_marina_geom", columns={"geom"})})
 * @ORM\Entity
 */
class AreaIntrusionMarina {

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
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="area_intrusion_marina_gid_seq", allocationSize=1, initialValue=1)
     */
    private $gid;

    /**
     * Set geom
     *
     * @param geometry $geom
     * @return AreaIntrusionMarina
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
     * @return AreaIntrusionMarina
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
     * @return AreaIntrusionMarina
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
     * Get gid
     *
     * @return integer
     */
    public function getGid() {
        return $this->gid;
    }

}
