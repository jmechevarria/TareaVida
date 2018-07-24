<?php

namespace TareaVidaBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Layer
 *
 * @ORM\Table(name="Layer", uniqueConstraints={@ORM\UniqueConstraint(name="uniq_e4db211abc68b450", columns={"background"}), @ORM\UniqueConstraint(name="uniq_e4db211acfcb9620", columns={"friendlyname"})}, indexes={@ORM\Index(name="idx_e4db211a727aca70", columns={"parent_id"})})
 * @ORM\Entity
 */
class Layer {

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="Layer_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column()
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column()
     */
    private $friendlyname;

    /**
     * @var string
     *
     * @ORM\Column()
     */
    private $background;

    /**
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    private $isbase;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    private $zindex;

    /**
     * @var string
     *
     * @ORM\Column(nullable=true)
     */
    private $filter;

    /**
     * @var \TareaVidaBundle\Entity\LayerGroup
     *
     * @ORM\ManyToOne(targetEntity="LayerGroup", inversedBy="layers")
     */
    private $parent;

    /**
     * Set name
     *
     * @param string $name
     * @return Layer
     */
    public function setName($name) {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * Set friendlyname
     *
     * @param string $friendlyname
     * @return Layer
     */
    public function setFriendlyname($friendlyname) {
        $this->friendlyname = $friendlyname;

        return $this;
    }

    /**
     * Get friendlyname
     *
     * @return string
     */
    public function getFriendlyname() {
        return $this->friendlyname;
    }

    /**
     * Set background
     *
     * @param string $background
     * @return Layer
     */
    public function setBackground($background) {
        $this->background = $background;

        return $this;
    }

    /**
     * Get background
     *
     * @return string
     */
    public function getBackground() {
        return $this->background;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Layer
     */
    public function setDescription($description) {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * Set isbase
     *
     * @param boolean $isbase
     * @return Layer
     */
    public function setIsbase($isbase) {
        $this->isbase = $isbase;

        return $this;
    }

    /**
     * Get isbase
     *
     * @return boolean
     */
    public function getIsbase() {
        return $this->isbase;
    }

    /**
     * Set zindex
     *
     * @param integer $zindex
     * @return Layer
     */
    public function setZindex($zindex) {
        $this->zindex = $zindex;

        return $this;
    }

    /**
     * Get zindex
     *
     * @return integer
     */
    public function getZindex() {
        return $this->zindex;
    }

    /**
     * Set filter
     *
     * @param string $filter
     * @return Layer
     */
    public function setFilter($filter) {
        $this->filter = $filter;

        return $this;
    }

    /**
     * Get filter
     *
     * @return string
     */
    public function getFilter() {
        return $this->filter;
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
     * Set parent
     *
     * @param \TareaVidaBundle\Entity\LayerGroup $parent
     * @return Layer
     */
    public function setParent(\TareaVidaBundle\Entity\LayerGroup $parent = null) {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return \TareaVidaBundle\Entity\LayerGroup
     */
    public function getParent() {
        return $this->parent;
    }

}
