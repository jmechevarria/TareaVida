<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Test2
 *
 * @ORM\Table(name="test2")
 * @ORM\Entity
 */
class Test2
{
    /**
     * @var integer
     *
     * @ORM\Column(name="k1", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $k1;

    /**
     * @var integer
     *
     * @ORM\Column(name="k2", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $k2;



    /**
     * Set k1
     *
     * @param integer $k1
     * @return Test2
     */
    public function setK1($k1)
    {
        $this->k1 = $k1;

        return $this;
    }

    /**
     * Get k1
     *
     * @return integer 
     */
    public function getK1()
    {
        return $this->k1;
    }

    /**
     * Set k2
     *
     * @param integer $k2
     * @return Test2
     */
    public function setK2($k2)
    {
        $this->k2 = $k2;

        return $this;
    }

    /**
     * Get k2
     *
     * @return integer 
     */
    public function getK2()
    {
        return $this->k2;
    }
}
