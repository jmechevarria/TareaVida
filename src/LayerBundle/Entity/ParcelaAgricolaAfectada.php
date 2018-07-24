<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ParcelaAgricolaAfectada
 *
 * @ORM\Table(name="parcela_agricola_afectada", indexes={@ORM\Index(name="sidx_parcela_agricola_afectada_geom", columns={"geom"})})
 * @ORM\Entity(repositoryClass="LayerBundle\Repository\ParcelaAgricolaAfectadaRepository")
 */
class ParcelaAgricolaAfectada {

    /**
     * @var integer
     *
     * @ORM\Column(type="bigint")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="parcela_agricola_afectada_gid_seq", allocationSize=1, initialValue=1)
     */
    private $gid;

    /**
     * @var geometry
     *
     * @ORM\Column(type="geometry", options={"geometry_type"="MULTIPOLYGON", "srid"=3795})
     */
    private $geom;

    /**
     * @var integer
     *
     * @ORM\Column(type="bigint", nullable=true)
     */
    private $fid;

    /**
     * @var integer
     *
     * @ORM\Column(type="bigint", nullable=true)
     */
    private $numero;

    /**
     * @var integer
     *
     * @ORM\Column(type="bigint", nullable=true)
     */
    private $division;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(length=100, nullable=true)
     */
    private $direccion;

    /**
     * @var string
     *
     * @ORM\Column(length=10, nullable=true)
     */
    private $numpostal;

    /**
     * @var string
     *
     * @ORM\Column(type="decimal", precision=10, scale=0)
     */
    private $area;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechacreac;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechacambi;

    /**
     * @var string
     *
     * @ORM\Column(length=6, nullable=true)
     */
    private $tipoparc;

    /**
     * @var string
     *
     * @ORM\Column(length=2, nullable=true)
     */
    private $delughab;

    /**
     * @var string
     *
     * @ORM\Column(length=2, nullable=true)
     */
    private $decayo;

    /**
     * @var string
     *
     * @ORM\Column(length=2, nullable=true)
     */
    private $tiposup;

    /**
     * @var string
     *
     * @ORM\Column(length=2, nullable=true)
     */
    private $tipouso;

    /**
     * @var string
     *
     * @ORM\Column(length=2, nullable=true)
     */
    private $espuso;

    /**
     * @var string
     *
     * @ORM\Column(length=11, nullable=true)
     */
    private $poseedor;

    /**
     * @var string
     *
     * @ORM\Column(length=11, nullable=true)
     */
    private $propietari;

    /**
     * @var string
     *
     * @ORM\Column(length=2, nullable=true)
     */
    private $regimen;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $nic;

    /**
     * @var string
     *
     * @ORM\Column(type="decimal", precision=10, scale=0, nullable=true)
     */
    private $valcat;

    /**
     * @var string
     *
     * @ORM\Column(length=36, nullable=true)
     */
    private $municipio;

    /**
     * @var string
     *
     * @ORM\Column(length=36, nullable=true)
     */
    private $consejopop;

    /**
     * @var string
     *
     * @ORM\Column(length=36, nullable=true)
     */
    private $finca;

    /**
     * @var string
     *
     * @ORM\Column(length=2, nullable=true)
     */
    private $riego;

    /**
     * @var string
     *
     * @ORM\Column(length=2, nullable=true)
     */
    private $roturacion;

    /**
     * @var string
     *
     * @ORM\Column(length=2, nullable=true)
     */
    private $usufructo;

    /**
     * @var string
     *
     * @ORM\Column(name="mi_prinx", length=36, nullable=true)
     */
    private $miPrinx;

    /**
     * @var string
     *
     * @ORM\Column(name="municipio_nombre", length=100, nullable=true)
     */
    private $municipioNombre;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre_tipo_uso", nullable=true)
     */
    private $nombreTipoUso;

    /**
     * @var string
     *
     * @ORM\Column(name="forma_prod", nullable=true)
     */
    private $formaProd;

    /**
     * Set geom
     *
     * @param geometry $geom
     * @return ParcelaAgricolaAfectada
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
     * Set fid
     *
     * @param integer $fid
     * @return ParcelaAgricolaAfectada
     */
    public function setFid($fid) {
        $this->fid = $fid;

        return $this;
    }

    /**
     * Get fid
     *
     * @return integer
     */
    public function getFid() {
        return $this->fid;
    }

    /**
     * Set numero
     *
     * @param integer $numero
     * @return ParcelaAgricolaAfectada
     */
    public function setNumero($numero) {
        $this->numero = $numero;

        return $this;
    }

    /**
     * Get numero
     *
     * @return integer
     */
    public function getNumero() {
        return $this->numero;
    }

    /**
     * Set division
     *
     * @param integer $division
     * @return ParcelaAgricolaAfectada
     */
    public function setDivision($division) {
        $this->division = $division;

        return $this;
    }

    /**
     * Get division
     *
     * @return integer
     */
    public function getDivision() {
        return $this->division;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     * @return ParcelaAgricolaAfectada
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
     * @return ParcelaAgricolaAfectada
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
     * Set numpostal
     *
     * @param string $numpostal
     * @return ParcelaAgricolaAfectada
     */
    public function setNumpostal($numpostal) {
        $this->numpostal = $numpostal;

        return $this;
    }

    /**
     * Get numpostal
     *
     * @return string
     */
    public function getNumpostal() {
        return $this->numpostal;
    }

    /**
     * Set area
     *
     * @param string $area
     * @return ParcelaAgricolaAfectada
     */
    public function setArea($area) {
        $this->area = $area;

        return $this;
    }

    /**
     * Get area
     *
     * @return string
     */
    public function getArea() {
        return $this->area;
    }

    /**
     * Set fechacreac
     *
     * @param \DateTime $fechacreac
     * @return ParcelaAgricolaAfectada
     */
    public function setFechacreac($fechacreac) {
        $this->fechacreac = $fechacreac;

        return $this;
    }

    /**
     * Get fechacreac
     *
     * @return \DateTime
     */
    public function getFechacreac() {
        return $this->fechacreac;
    }

    /**
     * Set fechacambi
     *
     * @param \DateTime $fechacambi
     * @return ParcelaAgricolaAfectada
     */
    public function setFechacambi($fechacambi) {
        $this->fechacambi = $fechacambi;

        return $this;
    }

    /**
     * Get fechacambi
     *
     * @return \DateTime
     */
    public function getFechacambi() {
        return $this->fechacambi;
    }

    /**
     * Set tipoparc
     *
     * @param string $tipoparc
     * @return ParcelaAgricolaAfectada
     */
    public function setTipoparc($tipoparc) {
        $this->tipoparc = $tipoparc;

        return $this;
    }

    /**
     * Get tipoparc
     *
     * @return string
     */
    public function getTipoparc() {
        return $this->tipoparc;
    }

    /**
     * Set delughab
     *
     * @param string $delughab
     * @return ParcelaAgricolaAfectada
     */
    public function setDelughab($delughab) {
        $this->delughab = $delughab;

        return $this;
    }

    /**
     * Get delughab
     *
     * @return string
     */
    public function getDelughab() {
        return $this->delughab;
    }

    /**
     * Set decayo
     *
     * @param string $decayo
     * @return ParcelaAgricolaAfectada
     */
    public function setDecayo($decayo) {
        $this->decayo = $decayo;

        return $this;
    }

    /**
     * Get decayo
     *
     * @return string
     */
    public function getDecayo() {
        return $this->decayo;
    }

    /**
     * Set tiposup
     *
     * @param string $tiposup
     * @return ParcelaAgricolaAfectada
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
     * @return ParcelaAgricolaAfectada
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
     * @return ParcelaAgricolaAfectada
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
     * Set poseedor
     *
     * @param string $poseedor
     * @return ParcelaAgricolaAfectada
     */
    public function setPoseedor($poseedor) {
        $this->poseedor = $poseedor;

        return $this;
    }

    /**
     * Get poseedor
     *
     * @return string
     */
    public function getPoseedor() {
        return $this->poseedor;
    }

    /**
     * Set propietari
     *
     * @param string $propietari
     * @return ParcelaAgricolaAfectada
     */
    public function setPropietari($propietari) {
        $this->propietari = $propietari;

        return $this;
    }

    /**
     * Get propietari
     *
     * @return string
     */
    public function getPropietari() {
        return $this->propietari;
    }

    /**
     * Set regimen
     *
     * @param string $regimen
     * @return ParcelaAgricolaAfectada
     */
    public function setRegimen($regimen) {
        $this->regimen = $regimen;

        return $this;
    }

    /**
     * Get regimen
     *
     * @return string
     */
    public function getRegimen() {
        return $this->regimen;
    }

    /**
     * Set nic
     *
     * @param string $nic
     * @return ParcelaAgricolaAfectada
     */
    public function setNic($nic) {
        $this->nic = $nic;

        return $this;
    }

    /**
     * Get nic
     *
     * @return string
     */
    public function getNic() {
        return $this->nic;
    }

    /**
     * Set valcat
     *
     * @param string $valcat
     * @return ParcelaAgricolaAfectada
     */
    public function setValcat($valcat) {
        $this->valcat = $valcat;

        return $this;
    }

    /**
     * Get valcat
     *
     * @return string
     */
    public function getValcat() {
        return $this->valcat;
    }

    /**
     * Set municipio
     *
     * @param string $municipio
     * @return ParcelaAgricolaAfectada
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
     * Set consejopop
     *
     * @param string $consejopop
     * @return ParcelaAgricolaAfectada
     */
    public function setConsejopop($consejopop) {
        $this->consejopop = $consejopop;

        return $this;
    }

    /**
     * Get consejopop
     *
     * @return string
     */
    public function getConsejopop() {
        return $this->consejopop;
    }

    /**
     * Set finca
     *
     * @param string $finca
     * @return ParcelaAgricolaAfectada
     */
    public function setFinca($finca) {
        $this->finca = $finca;

        return $this;
    }

    /**
     * Get finca
     *
     * @return string
     */
    public function getFinca() {
        return $this->finca;
    }

    /**
     * Set riego
     *
     * @param string $riego
     * @return ParcelaAgricolaAfectada
     */
    public function setRiego($riego) {
        $this->riego = $riego;

        return $this;
    }

    /**
     * Get riego
     *
     * @return string
     */
    public function getRiego() {
        return $this->riego;
    }

    /**
     * Set roturacion
     *
     * @param string $roturacion
     * @return ParcelaAgricolaAfectada
     */
    public function setRoturacion($roturacion) {
        $this->roturacion = $roturacion;

        return $this;
    }

    /**
     * Get roturacion
     *
     * @return string
     */
    public function getRoturacion() {
        return $this->roturacion;
    }

    /**
     * Set usufructo
     *
     * @param string $usufructo
     * @return ParcelaAgricolaAfectada
     */
    public function setUsufructo($usufructo) {
        $this->usufructo = $usufructo;

        return $this;
    }

    /**
     * Get usufructo
     *
     * @return string
     */
    public function getUsufructo() {
        return $this->usufructo;
    }

    /**
     * Set miPrinx
     *
     * @param string $miPrinx
     * @return ParcelaAgricolaAfectada
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
     * Set municipioNombre
     *
     * @param string $municipioNombre
     * @return ParcelaAgricolaAfectada
     */
    public function setMunicipioNombre($municipioNombre) {
        $this->municipioNombre = $municipioNombre;

        return $this;
    }

    /**
     * Get municipioNombre
     *
     * @return string
     */
    public function getMunicipioNombre() {
        return $this->municipioNombre;
    }

    /**
     * Set nombreTipoUso
     *
     * @param string $nombreTipoUso
     * @return ParcelaAgricolaAfectada
     */
    public function setNombreTipoUso($nombreTipoUso) {
        $this->nombreTipoUso = $nombreTipoUso;

        return $this;
    }

    /**
     * Get nombreTipoUso
     *
     * @return string
     */
    public function getNombreTipoUso() {
        return $this->nombreTipoUso;
    }

    /**
     * Set formaProd
     *
     * @param string $formaProd
     * @return ParcelaAgricolaAfectada
     */
    public function setFormaProd($formaProd) {
        $this->formaProd = $formaProd;

        return $this;
    }

    /**
     * Get formaProd
     *
     * @return string
     */
    public function getFormaProd() {
        return $this->formaProd;
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
