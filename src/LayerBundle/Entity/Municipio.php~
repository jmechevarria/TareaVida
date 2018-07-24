<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Municipio
 *
 * @ORM\Table(name="municipio")
 * @ORM\Entity
 */
class Municipio {

    /**
     * @var string
     *
     * @ORM\Column()
     */
    private $nombre;

    /**
     * @var geometry
     *
     * @ORM\Column(type="geometry", options={"geometry_type"="MULTIPOLYGON", "srid"=3795})
     */
    private $geom;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="municipio_gid_seq", allocationSize=1, initialValue=1)
     */
    private $gid;

    /**
     * Set nombre
     *
     * @param string $nombre
     * @return Municipio
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
     * Set geom
     *
     * @param geometry $geom
     * @return Municipio
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
     * Get gid
     *
     * @return integer
     */
    public function getGid() {
        return $this->gid;
    }

}
