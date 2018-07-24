<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TipoUso
 *
 * @ORM\Table(name="tipo_uso")
 * @ORM\Entity
 */
class TipoUso {

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $tiposup;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $tipouso;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $espuso;

    /**
     * @var string
     *
     * @ORM\Column(nullable=true)
     */
    private $nombre;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="tipo_uso_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * Set tiposup
     *
     * @param string $tiposup
     * @return TipoUso
     */
    public function setTiposup($tiposup) {
        $this->tiposup = $tiposup;

        return $this;
    }

    /**
     * Get tiposup
     *
     * @return string
     */
    public function getTiposup() {
        return $this->tiposup;
    }

    /**
     * Set tipouso
     *
     * @param string $tipouso
     * @return TipoUso
     */
    public function setTipouso($tipouso) {
        $this->tipouso = $tipouso;

        return $this;
    }

    /**
     * Get tipouso
     *
     * @return string
     */
    public function getTipouso() {
        return $this->tipouso;
    }

    /**
     * Set espuso
     *
     * @param string $espuso
     * @return TipoUso
     */
    public function setEspuso($espuso) {
        $this->espuso = $espuso;

        return $this;
    }

    /**
     * Get espuso
     *
     * @return string
     */
    public function getEspuso() {
        return $this->espuso;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     * @return TipoUso
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

}
