<?php

namespace LayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SueloAfectado
 *
 * @ORM\Table(name="suelo_afectado")
 * @ORM\Entity(repositoryClass="LayerBundle\Repository\SueloAfectadoRepository")
 */
class SueloAfectado {

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="suelo_afectado_gid_seq", allocationSize=1, initialValue=1)
     */
    private $gid;

    /**
     * @var geometry
     *
     * @ORM\Column(type="geometry", options={"geometry_type"="MULTIPOLYGON", "srid"=3795}, nullable=true)
     */
    private $geom;

    /**
     * @var float
     *
     * @ORM\Column(name="clasif_id", type="float", precision=10, scale=0, nullable=true)
     */
    private $clasifId;

    /**
     * @var float
     *
     * @ORM\Column(name="municipio_id", type="float", precision=10, scale=0, nullable=true)
     */
    private $municipioId;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $municipio;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $tipos;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $subtipos;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $gravillosidad;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $pedregosidad;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $rocosidadad;

    /**
     * @var string
     *
     * @ORM\Column(name="profundidad_efectiva", length=50, nullable=true)
     */
    private $profundidadEfectiva;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $pendiente;

    /**
     * @var string
     *
     * @ORM\Column(name="clave_perfil", length=50, nullable=true)
     */
    private $clavePerfil;

    /**
     * @var string
     *
     * @ORM\Column(length=1, nullable=true)
     */
    private $perfil;

    /**
     * @var string
     *
     * @ORM\Column(length=1, nullable=true)
     */
    private $control;

    /**
     * @var float
     *
     * @ORM\Column(type="float", precision=10, scale=0, nullable=true)
     */
    private $profundidad;

    /**
     * @var string
     *
     * @ORM\Column(name="hoja_cartografica", length=50, nullable=true)
     */
    private $hojaCartografica;

    /**
     * @var float
     *
     * @ORM\Column(type="float", precision=10, scale=0, nullable=true)
     */
    private $nro;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $w;

    /**
     * @var string
     *
     * @ORM\Column(length=50, nullable=true)
     */
    private $e;

    /**
     * @var string
     *
     * @ORM\Column(length=40, nullable=true)
     */
    private $salinidad;

    /**
     * @var string
     *
     * @ORM\Column(length=40, nullable=true)
     */
    private $erosion;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $ajo;

    /**
     * @var string
     *
     * @ORM\Column(name="arroz_frio", length=3, nullable=true)
     */
    private $arrozFrio;

    /**
     * @var string
     *
     * @ORM\Column(name="arroz_primavera", length=3, nullable=true)
     */
    private $arrozPrimavera;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $berengena;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $boniato;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $cafe;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $calabaza;

    /**
     * @var string
     *
     * @ORM\Column(name="ca_a_soca", length=3, nullable=true)
     */
    private $caASoca;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $cebolla;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $citrico;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $col;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $frijoles;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $frutabomba;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $guayaba;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $maiz;

    /**
     * @var string
     *
     * @ORM\Column(name="malanga_colocacia", length=3, nullable=true)
     */
    private $malangaColocacia;

    /**
     * @var string
     *
     * @ORM\Column(name="malanga_xantosorna", length=3, nullable=true)
     */
    private $malangaXantosorna;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $mango;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $melon;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $papa;

    /**
     * @var string
     *
     * @ORM\Column(name="pasto_artificial", length=3, nullable=true)
     */
    private $pastoArtificial;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $pepino;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $pimiento;

    /**
     * @var string
     *
     * @ORM\Column(name="pi_a", length=3, nullable=true)
     */
    private $piA;

    /**
     * @var string
     *
     * @ORM\Column(name="platano_fruta", length=3, nullable=true)
     */
    private $platanoFruta;

    /**
     * @var string
     *
     * @ORM\Column(name="platano_vianda", length=3, nullable=true)
     */
    private $platanoVianda;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $remolacha;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $tabaco;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $tomate;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $yuca;

    /**
     * @var string
     *
     * @ORM\Column(length=3, nullable=true)
     */
    private $zanahoria;

    /**
     * @var float
     *
     * @ORM\Column(name="cat_gral10_cult", type="float", precision=10, scale=0, nullable=true)
     */
    private $catGral10Cult;

    /**
     * @var float
     *
     * @ORM\Column(type="float", precision=10, scale=0, nullable=true)
     */
    private $area;

    /**
     * @ORM\ManyToMany(targetEntity="FactorLimitante", mappedBy="sueloAfectado")
     */
    private $factorLimitante;

    /**
     *
     * @ORM\OneToMany(targetEntity="AccionSuelo", mappedBy="suelo")
     */
    private $asociacionAccionSuelo;

    /**
     * Constructor
     */
    public function __construct() {
        $this->factorLimitante = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get gid
     *
     * @return integer
     */
    public function getGid() {
        return $this->gid;
    }

    /**
     * Set geom
     *
     * @param geometry $geom
     * @return SueloAfectado
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
     * Set clasifId
     *
     * @param float $clasifId
     * @return SueloAfectado
     */
    public function setClasifId($clasifId) {
        $this->clasifId = $clasifId;

        return $this;
    }

    /**
     * Get clasifId
     *
     * @return float
     */
    public function getClasifId() {
        return $this->clasifId;
    }

    /**
     * Set municipioId
     *
     * @param float $municipioId
     * @return SueloAfectado
     */
    public function setMunicipioId($municipioId) {
        $this->municipioId = $municipioId;

        return $this;
    }

    /**
     * Get municipioId
     *
     * @return float
     */
    public function getMunicipioId() {
        return $this->municipioId;
    }

    /**
     * Set municipio
     *
     * @param string $municipio
     * @return SueloAfectado
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
     * Set tipos
     *
     * @param string $tipos
     * @return SueloAfectado
     */
    public function setTipos($tipos) {
        $this->tipos = $tipos;

        return $this;
    }

    /**
     * Get tipos
     *
     * @return string
     */
    public function getTipos() {
        return $this->tipos;
    }

    /**
     * Set subtipos
     *
     * @param string $subtipos
     * @return SueloAfectado
     */
    public function setSubtipos($subtipos) {
        $this->subtipos = $subtipos;

        return $this;
    }

    /**
     * Get subtipos
     *
     * @return string
     */
    public function getSubtipos() {
        return $this->subtipos;
    }

    /**
     * Set gravillosidad
     *
     * @param string $gravillosidad
     * @return SueloAfectado
     */
    public function setGravillosidad($gravillosidad) {
        $this->gravillosidad = $gravillosidad;

        return $this;
    }

    /**
     * Get gravillosidad
     *
     * @return string
     */
    public function getGravillosidad() {
        return $this->gravillosidad;
    }

    /**
     * Set pedregosidad
     *
     * @param string $pedregosidad
     * @return SueloAfectado
     */
    public function setPedregosidad($pedregosidad) {
        $this->pedregosidad = $pedregosidad;

        return $this;
    }

    /**
     * Get pedregosidad
     *
     * @return string
     */
    public function getPedregosidad() {
        return $this->pedregosidad;
    }

    /**
     * Set rocosidadad
     *
     * @param string $rocosidadad
     * @return SueloAfectado
     */
    public function setRocosidadad($rocosidadad) {
        $this->rocosidadad = $rocosidadad;

        return $this;
    }

    /**
     * Get rocosidadad
     *
     * @return string
     */
    public function getRocosidadad() {
        return $this->rocosidadad;
    }

    /**
     * Set profundidadEfectiva
     *
     * @param string $profundidadEfectiva
     * @return SueloAfectado
     */
    public function setProfundidadEfectiva($profundidadEfectiva) {
        $this->profundidadEfectiva = $profundidadEfectiva;

        return $this;
    }

    /**
     * Get profundidadEfectiva
     *
     * @return string
     */
    public function getProfundidadEfectiva() {
        return $this->profundidadEfectiva;
    }

    /**
     * Set pendiente
     *
     * @param string $pendiente
     * @return SueloAfectado
     */
    public function setPendiente($pendiente) {
        $this->pendiente = $pendiente;

        return $this;
    }

    /**
     * Get pendiente
     *
     * @return string
     */
    public function getPendiente() {
        return $this->pendiente;
    }

    /**
     * Set clavePerfil
     *
     * @param string $clavePerfil
     * @return SueloAfectado
     */
    public function setClavePerfil($clavePerfil) {
        $this->clavePerfil = $clavePerfil;

        return $this;
    }

    /**
     * Get clavePerfil
     *
     * @return string
     */
    public function getClavePerfil() {
        return $this->clavePerfil;
    }

    /**
     * Set perfil
     *
     * @param string $perfil
     * @return SueloAfectado
     */
    public function setPerfil($perfil) {
        $this->perfil = $perfil;

        return $this;
    }

    /**
     * Get perfil
     *
     * @return string
     */
    public function getPerfil() {
        return $this->perfil;
    }

    /**
     * Set control
     *
     * @param string $control
     * @return SueloAfectado
     */
    public function setControl($control) {
        $this->control = $control;

        return $this;
    }

    /**
     * Get control
     *
     * @return string
     */
    public function getControl() {
        return $this->control;
    }

    /**
     * Set profundidad
     *
     * @param float $profundidad
     * @return SueloAfectado
     */
    public function setProfundidad($profundidad) {
        $this->profundidad = $profundidad;

        return $this;
    }

    /**
     * Get profundidad
     *
     * @return float
     */
    public function getProfundidad() {
        return $this->profundidad;
    }

    /**
     * Set hojaCartografica
     *
     * @param string $hojaCartografica
     * @return SueloAfectado
     */
    public function setHojaCartografica($hojaCartografica) {
        $this->hojaCartografica = $hojaCartografica;

        return $this;
    }

    /**
     * Get hojaCartografica
     *
     * @return string
     */
    public function getHojaCartografica() {
        return $this->hojaCartografica;
    }

    /**
     * Set nro
     *
     * @param float $nro
     * @return SueloAfectado
     */
    public function setNro($nro) {
        $this->nro = $nro;

        return $this;
    }

    /**
     * Get nro
     *
     * @return float
     */
    public function getNro() {
        return $this->nro;
    }

    /**
     * Set w
     *
     * @param string $w
     * @return SueloAfectado
     */
    public function setW($w) {
        $this->w = $w;

        return $this;
    }

    /**
     * Get w
     *
     * @return string
     */
    public function getW() {
        return $this->w;
    }

    /**
     * Set e
     *
     * @param string $e
     * @return SueloAfectado
     */
    public function setE($e) {
        $this->e = $e;

        return $this;
    }

    /**
     * Get e
     *
     * @return string
     */
    public function getE() {
        return $this->e;
    }

    /**
     * Set salinidad
     *
     * @param string $salinidad
     * @return SueloAfectado
     */
    public function setSalinidad($salinidad) {
        $this->salinidad = $salinidad;

        return $this;
    }

    /**
     * Get salinidad
     *
     * @return string
     */
    public function getSalinidad() {
        return $this->salinidad;
    }

    /**
     * Set erosion
     *
     * @param string $erosion
     * @return SueloAfectado
     */
    public function setErosion($erosion) {
        $this->erosion = $erosion;

        return $this;
    }

    /**
     * Get erosion
     *
     * @return string
     */
    public function getErosion() {
        return $this->erosion;
    }

    /**
     * Set ajo
     *
     * @param string $ajo
     * @return SueloAfectado
     */
    public function setAjo($ajo) {
        $this->ajo = $ajo;

        return $this;
    }

    /**
     * Get ajo
     *
     * @return string
     */
    public function getAjo() {
        return $this->ajo;
    }

    /**
     * Set arrozFrio
     *
     * @param string $arrozFrio
     * @return SueloAfectado
     */
    public function setArrozFrio($arrozFrio) {
        $this->arrozFrio = $arrozFrio;

        return $this;
    }

    /**
     * Get arrozFrio
     *
     * @return string
     */
    public function getArrozFrio() {
        return $this->arrozFrio;
    }

    /**
     * Set arrozPrimavera
     *
     * @param string $arrozPrimavera
     * @return SueloAfectado
     */
    public function setArrozPrimavera($arrozPrimavera) {
        $this->arrozPrimavera = $arrozPrimavera;

        return $this;
    }

    /**
     * Get arrozPrimavera
     *
     * @return string
     */
    public function getArrozPrimavera() {
        return $this->arrozPrimavera;
    }

    /**
     * Set berengena
     *
     * @param string $berengena
     * @return SueloAfectado
     */
    public function setBerengena($berengena) {
        $this->berengena = $berengena;

        return $this;
    }

    /**
     * Get berengena
     *
     * @return string
     */
    public function getBerengena() {
        return $this->berengena;
    }

    /**
     * Set boniato
     *
     * @param string $boniato
     * @return SueloAfectado
     */
    public function setBoniato($boniato) {
        $this->boniato = $boniato;

        return $this;
    }

    /**
     * Get boniato
     *
     * @return string
     */
    public function getBoniato() {
        return $this->boniato;
    }

    /**
     * Set cafe
     *
     * @param string $cafe
     * @return SueloAfectado
     */
    public function setCafe($cafe) {
        $this->cafe = $cafe;

        return $this;
    }

    /**
     * Get cafe
     *
     * @return string
     */
    public function getCafe() {
        return $this->cafe;
    }

    /**
     * Set calabaza
     *
     * @param string $calabaza
     * @return SueloAfectado
     */
    public function setCalabaza($calabaza) {
        $this->calabaza = $calabaza;

        return $this;
    }

    /**
     * Get calabaza
     *
     * @return string
     */
    public function getCalabaza() {
        return $this->calabaza;
    }

    /**
     * Set caASoca
     *
     * @param string $caASoca
     * @return SueloAfectado
     */
    public function setCaASoca($caASoca) {
        $this->caASoca = $caASoca;

        return $this;
    }

    /**
     * Get caASoca
     *
     * @return string
     */
    public function getCaASoca() {
        return $this->caASoca;
    }

    /**
     * Set cebolla
     *
     * @param string $cebolla
     * @return SueloAfectado
     */
    public function setCebolla($cebolla) {
        $this->cebolla = $cebolla;

        return $this;
    }

    /**
     * Get cebolla
     *
     * @return string
     */
    public function getCebolla() {
        return $this->cebolla;
    }

    /**
     * Set citrico
     *
     * @param string $citrico
     * @return SueloAfectado
     */
    public function setCitrico($citrico) {
        $this->citrico = $citrico;

        return $this;
    }

    /**
     * Get citrico
     *
     * @return string
     */
    public function getCitrico() {
        return $this->citrico;
    }

    /**
     * Set col
     *
     * @param string $col
     * @return SueloAfectado
     */
    public function setCol($col) {
        $this->col = $col;

        return $this;
    }

    /**
     * Get col
     *
     * @return string
     */
    public function getCol() {
        return $this->col;
    }

    /**
     * Set frijoles
     *
     * @param string $frijoles
     * @return SueloAfectado
     */
    public function setFrijoles($frijoles) {
        $this->frijoles = $frijoles;

        return $this;
    }

    /**
     * Get frijoles
     *
     * @return string
     */
    public function getFrijoles() {
        return $this->frijoles;
    }

    /**
     * Set frutabomba
     *
     * @param string $frutabomba
     * @return SueloAfectado
     */
    public function setFrutabomba($frutabomba) {
        $this->frutabomba = $frutabomba;

        return $this;
    }

    /**
     * Get frutabomba
     *
     * @return string
     */
    public function getFrutabomba() {
        return $this->frutabomba;
    }

    /**
     * Set guayaba
     *
     * @param string $guayaba
     * @return SueloAfectado
     */
    public function setGuayaba($guayaba) {
        $this->guayaba = $guayaba;

        return $this;
    }

    /**
     * Get guayaba
     *
     * @return string
     */
    public function getGuayaba() {
        return $this->guayaba;
    }

    /**
     * Set maiz
     *
     * @param string $maiz
     * @return SueloAfectado
     */
    public function setMaiz($maiz) {
        $this->maiz = $maiz;

        return $this;
    }

    /**
     * Get maiz
     *
     * @return string
     */
    public function getMaiz() {
        return $this->maiz;
    }

    /**
     * Set malangaColocacia
     *
     * @param string $malangaColocacia
     * @return SueloAfectado
     */
    public function setMalangaColocacia($malangaColocacia) {
        $this->malangaColocacia = $malangaColocacia;

        return $this;
    }

    /**
     * Get malangaColocacia
     *
     * @return string
     */
    public function getMalangaColocacia() {
        return $this->malangaColocacia;
    }

    /**
     * Set malangaXantosorna
     *
     * @param string $malangaXantosorna
     * @return SueloAfectado
     */
    public function setMalangaXantosorna($malangaXantosorna) {
        $this->malangaXantosorna = $malangaXantosorna;

        return $this;
    }

    /**
     * Get malangaXantosorna
     *
     * @return string
     */
    public function getMalangaXantosorna() {
        return $this->malangaXantosorna;
    }

    /**
     * Set mango
     *
     * @param string $mango
     * @return SueloAfectado
     */
    public function setMango($mango) {
        $this->mango = $mango;

        return $this;
    }

    /**
     * Get mango
     *
     * @return string
     */
    public function getMango() {
        return $this->mango;
    }

    /**
     * Set melon
     *
     * @param string $melon
     * @return SueloAfectado
     */
    public function setMelon($melon) {
        $this->melon = $melon;

        return $this;
    }

    /**
     * Get melon
     *
     * @return string
     */
    public function getMelon() {
        return $this->melon;
    }

    /**
     * Set papa
     *
     * @param string $papa
     * @return SueloAfectado
     */
    public function setPapa($papa) {
        $this->papa = $papa;

        return $this;
    }

    /**
     * Get papa
     *
     * @return string
     */
    public function getPapa() {
        return $this->papa;
    }

    /**
     * Set pastoArtificial
     *
     * @param string $pastoArtificial
     * @return SueloAfectado
     */
    public function setPastoArtificial($pastoArtificial) {
        $this->pastoArtificial = $pastoArtificial;

        return $this;
    }

    /**
     * Get pastoArtificial
     *
     * @return string
     */
    public function getPastoArtificial() {
        return $this->pastoArtificial;
    }

    /**
     * Set pepino
     *
     * @param string $pepino
     * @return SueloAfectado
     */
    public function setPepino($pepino) {
        $this->pepino = $pepino;

        return $this;
    }

    /**
     * Get pepino
     *
     * @return string
     */
    public function getPepino() {
        return $this->pepino;
    }

    /**
     * Set pimiento
     *
     * @param string $pimiento
     * @return SueloAfectado
     */
    public function setPimiento($pimiento) {
        $this->pimiento = $pimiento;

        return $this;
    }

    /**
     * Get pimiento
     *
     * @return string
     */
    public function getPimiento() {
        return $this->pimiento;
    }

    /**
     * Set piA
     *
     * @param string $piA
     * @return SueloAfectado
     */
    public function setPiA($piA) {
        $this->piA = $piA;

        return $this;
    }

    /**
     * Get piA
     *
     * @return string
     */
    public function getPiA() {
        return $this->piA;
    }

    /**
     * Set platanoFruta
     *
     * @param string $platanoFruta
     * @return SueloAfectado
     */
    public function setPlatanoFruta($platanoFruta) {
        $this->platanoFruta = $platanoFruta;

        return $this;
    }

    /**
     * Get platanoFruta
     *
     * @return string
     */
    public function getPlatanoFruta() {
        return $this->platanoFruta;
    }

    /**
     * Set platanoVianda
     *
     * @param string $platanoVianda
     * @return SueloAfectado
     */
    public function setPlatanoVianda($platanoVianda) {
        $this->platanoVianda = $platanoVianda;

        return $this;
    }

    /**
     * Get platanoVianda
     *
     * @return string
     */
    public function getPlatanoVianda() {
        return $this->platanoVianda;
    }

    /**
     * Set remolacha
     *
     * @param string $remolacha
     * @return SueloAfectado
     */
    public function setRemolacha($remolacha) {
        $this->remolacha = $remolacha;

        return $this;
    }

    /**
     * Get remolacha
     *
     * @return string
     */
    public function getRemolacha() {
        return $this->remolacha;
    }

    /**
     * Set tabaco
     *
     * @param string $tabaco
     * @return SueloAfectado
     */
    public function setTabaco($tabaco) {
        $this->tabaco = $tabaco;

        return $this;
    }

    /**
     * Get tabaco
     *
     * @return string
     */
    public function getTabaco() {
        return $this->tabaco;
    }

    /**
     * Set tomate
     *
     * @param string $tomate
     * @return SueloAfectado
     */
    public function setTomate($tomate) {
        $this->tomate = $tomate;

        return $this;
    }

    /**
     * Get tomate
     *
     * @return string
     */
    public function getTomate() {
        return $this->tomate;
    }

    /**
     * Set yuca
     *
     * @param string $yuca
     * @return SueloAfectado
     */
    public function setYuca($yuca) {
        $this->yuca = $yuca;

        return $this;
    }

    /**
     * Get yuca
     *
     * @return string
     */
    public function getYuca() {
        return $this->yuca;
    }

    /**
     * Set zanahoria
     *
     * @param string $zanahoria
     * @return SueloAfectado
     */
    public function setZanahoria($zanahoria) {
        $this->zanahoria = $zanahoria;

        return $this;
    }

    /**
     * Get zanahoria
     *
     * @return string
     */
    public function getZanahoria() {
        return $this->zanahoria;
    }

    /**
     * Set catGral10Cult
     *
     * @param float $catGral10Cult
     * @return SueloAfectado
     */
    public function setCatGral10Cult($catGral10Cult) {
        $this->catGral10Cult = $catGral10Cult;

        return $this;
    }

    /**
     * Get catGral10Cult
     *
     * @return float
     */
    public function getCatGral10Cult() {
        return $this->catGral10Cult;
    }

    /**
     * Set area
     *
     * @param float $area
     * @return SueloAfectado
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
     * Add factorLimitante
     *
     * @param \LayerBundle\Entity\FactorLimitante $factorLimitante
     * @return SueloAfectado
     */
    public function addFactorLimitante(\LayerBundle\Entity\FactorLimitante $factorLimitante) {
        $this->factorLimitante[] = $factorLimitante;

        return $this;
    }

    /**
     * Remove factorLimitante
     *
     * @param \LayerBundle\Entity\FactorLimitante $factorLimitante
     */
    public function removeFactorLimitante(\LayerBundle\Entity\FactorLimitante $factorLimitante) {
        $this->factorLimitante->removeElement($factorLimitante);
    }

    /**
     * Get factorLimitante
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFactorLimitante() {
        return $this->factorLimitante;
    }

    /**
     * Add accionDeMejoramiento
     *
     * @param \LayerBundle\Entity\AccionDeMejoramiento $accionDeMejoramiento
     * @return SueloAfectado
     */
    public function addAccionDeMejoramiento(\LayerBundle\Entity\AccionDeMejoramiento $accionDeMejoramiento) {
        $this->accionDeMejoramiento[] = $accionDeMejoramiento;

        return $this;
    }

    /**
     * Remove accionDeMejoramiento
     *
     * @param \LayerBundle\Entity\AccionDeMejoramiento $accionDeMejoramiento
     */
    public function removeAccionDeMejoramiento(\LayerBundle\Entity\AccionDeMejoramiento $accionDeMejoramiento) {
        $this->accionDeMejoramiento->removeElement($accionDeMejoramiento);
    }

    /**
     * Get accionDeMejoramiento
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAccionDeMejoramiento() {
        return $this->accionDeMejoramiento;
    }

    /**
     * Add asociacionAccionSuelo
     *
     * @param \LayerBundle\Entity\AccionSuelo $asociacionAccionSuelo
     * @return SueloAfectado
     */
    public function addAsociacionAccionSuelo(\LayerBundle\Entity\AccionSuelo $asociacionAccionSuelo) {
        $this->asociacionAccionSuelo[] = $asociacionAccionSuelo;

        return $this;
    }

    /**
     * Remove asociacionAccionSuelo
     *
     * @param \LayerBundle\Entity\AccionSuelo $asociacionAccionSuelo
     */
    public function removeAsociacionAccionSuelo(\LayerBundle\Entity\AccionSuelo $asociacionAccionSuelo) {
        $this->asociacionAccionSuelo->removeElement($asociacionAccionSuelo);
    }

    /**
     * Get asociacionAccionSuelo
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAsociacionAccionSuelo() {
        return $this->asociacionAccionSuelo;
    }

}
