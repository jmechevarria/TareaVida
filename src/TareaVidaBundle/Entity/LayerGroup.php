<?php

namespace TareaVidaBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\ManyToOne;

/**
 * LayerGroup
 *
 * @ORM\Table(name="layer_group")
 * @ORM\Entity()
 */
class LayerGroup {

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(unique=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(unique=true)
     */
    private $friendlyname;

    /**
     *
     * @OneToMany(targetEntity="LayerGroup", mappedBy="parent")
     */
    private $subgroups;

    /**
     *
     * @ManyToOne(targetEntity="LayerGroup", inversedBy="subgroups")
     */
    private $parent;

    /**
     *
     * @OneToMany(targetEntity="Layer", mappedBy="parent")
     */
    private $layers;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return LayerGroup
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
     * @return LayerGroup
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
     * Constructor
     */
    public function __construct() {
        $this->subgroups = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add subgroups
     *
     * @param \TareaVidaBundle\Entity\LayerGroup $subgroups
     * @return LayerGroup
     */
    public function addSubgroup(\TareaVidaBundle\Entity\LayerGroup $subgroups) {
        $this->subgroups[] = $subgroups;

        return $this;
    }

    /**
     * Remove subgroups
     *
     * @param \TareaVidaBundle\Entity\LayerGroup $subgroups
     */
    public function removeSubgroup(\TareaVidaBundle\Entity\LayerGroup $subgroups) {
        $this->subgroups->removeElement($subgroups);
    }

    /**
     * Get subgroups
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSubgroups() {
        return $this->subgroups;
    }

    /**
     * Set parent
     *
     * @param \TareaVidaBundle\Entity\LayerGroup $parent
     * @return LayerGroup
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

    /**
     * Add layers
     *
     * @param \TareaVidaBundle\Entity\Layer $layers
     * @return LayerGroup
     */
    public function addLayer(\TareaVidaBundle\Entity\Layer $layers) {
        $this->layers[] = $layers;

        return $this;
    }

    /**
     * Remove layers
     *
     * @param \TareaVidaBundle\Entity\Layer $layers
     */
    public function removeLayer(\TareaVidaBundle\Entity\Layer $layers) {
        $this->layers->removeElement($layers);
    }

    /**
     * Get layers
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLayers() {
        return $this->layers;
    }

}
