<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FactorLimitante
 *
 * @ORM\Table(name="factor_limitante")
 * @ORM\Entity
 */
class FactorLimitante {

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="factor_limitante_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column()
     */
    private $nombre;

    /**
     * @ORM\ManyToMany(targetEntity="SueloAfectado", inversedBy="factorLimitante")
     *
     * @ORM\JoinTable(name="factor_suelo",
     * joinColumns={@ORM\JoinColumn(name="factor_id", referencedColumnName="id")},
     * inverseJoinColumns={@ORM\JoinColumn(name="suelo_id", referencedColumnName="gid")})
     */
    private $sueloAfectado;

    /**
     * Set nombre
     *
     * @param string $nombre
     * @return FactorLimitante
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
     * @return FactorLimitante
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

}
