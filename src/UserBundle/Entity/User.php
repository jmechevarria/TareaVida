<?php

namespace UserBundle\Entity;

//use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Context\ExecutionContext;

/**
 * User
 *
 * @ORM\Table(name="myuser")
 * @ORM\Entity
 * @UniqueEntity(fields="email", message="Email already taken, please try another")
 * @UniqueEntity(fields="username", message="Username already taken, please try another")
 * @ORM\HasLifecycleCallbacks
 * @Assert\Callback(methods={"validations"})
 */
class User implements UserInterface, \Serializable {

    /**
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column()
     * @Assert\NotBlank()
     * @Assert\Regex(pattern="/^([a-zA-Z]|'|-|\s)+$/")
     */
    protected $name;

    /**
     * @ORM\Column(nullable=true)
     * @Assert\NotBlank()
     * @Assert\Regex(pattern="/^([a-zA-Z]|'|-|\s)+$/")
     */
    protected $lastname;

    /**
     * @ORM\Column(unique=true)
     * @Assert\NotBlank()
     * @Assert\Regex(pattern="/^([a-zA-Z]|[0-9]|_)+$/")
     */
    protected $username;

    /**
     * @ORM\Column(unique=true, nullable=true)
     * @Assert\Email()
     */
    protected $email;

    /**
     * @ORM\Column(length=64)
     * @Assert\Length(max=64)
     */
    protected $password;

    /**
     * @ORM\Column(nullable=true)
     *
     * @Assert\Image(mimeTypesMessage = "Please upload a valid image", maxSize="5Mi", maxSizeMessage="The file is too large ({{ size }} {{ suffix }}). Allowed maximum size is {{ limit }} {{ suffix }}.")
     */
    private $image;

    /**
     * @ORM\ManyToOne(targetEntity="Role", inversedBy="users")
     */
    protected $role;

//
//    /**
//     * @ORM\Column(type="string", length=255)
//     */
//    protected $path;
//    private $temp;

    /**
     * @var string
     *
     * @ORM\Column()
     */
    protected $theme;

    public function __construct() {
        $this->theme = 'generic';
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
     * Set name
     *
     * @param string $name
     * @return User
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
     * Set lastname
     *
     * @param string $lastname
     * @return User
     */
    public function setLastname($lastname) {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname
     *
     * @return string
     */
    public function getLastname() {
        return $this->lastname;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return User
     */
    public function setUsername($username) {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername() {
        return $this->username;
    }

    public function getSalt() {
        return null;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return User
     */
    public function setEmail($email) {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail() {
        return $this->email;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return User
     */
    public function setPassword($password) {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword() {
        return $this->password;
    }

    /**
     * Set role
     *
     * @param \UserBundle\Entity\Role $role
     * @return User
     */
    public function setRole(\UserBundle\Entity\Role $role = null) {
        $this->role = $role;

        return $this;
    }

    /**
     * Get role
     *
     * @return \UserBundle\Entity\Role
     */
    public function getRole() {
        return $this->role;
    }

    /* USER INTERFACE NEEDS THESE */

    function equals(\Symfony\Component\Security\Core\User\UserInterface $user) {
        return $this->getUsername() == $user->getUsername();
    }

    function eraseCredentials() {

    }

    /**
     * Get roles
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRoles() {
        if (is_object($this->role))
            return array($this->role->getName());

        return array($this->role);
    }

    public function setImage($image) {
//        $this->file = $file;
//        // check if we have an old image path
//        if (isset($this->path)) {
//            // store the old name to delete after the update
//            $this->temp = $this->path;
//            $this->path = null;
//        } else {
//            $this->path = 'initial';
//        }
        $this->image = $image;
        return $this;
    }

    public function getImage() {
        return $this->image;
    }

//
//    /**
//     * @ORM\PrePersist()
//     * @ORM\PreUpdate()
//     */
//    public function preUpload() {
//        if (null !== $this->getFile()) {
//            // do whatever you want to generate a unique name
//            $filename = sha1(uniqid(mt_rand(), true));
//            $this->path = $filename . '.' . $this->getFile()->guessExtension();
//        }
//    }
//
//    /**
//     * @ORM\PostPersist()
//     * @ORM\PostUpdate()
//     */
//    public function upload() {
//        if (null === $this->getFile()) {
//            return;
//        }// if there is an error when moving the file, an exception will
//// be automatically thrown by move(). This will properly prevent
//// the entity from being persisted to the database on error
//        $this->getFile()->move($this->getUploadRootDir(), $this->path);
//// check if we have an old image
//        if (isset($this->temp)) {
//// delete the old image
//            unlink($this->getUploadRootDir() . '/' . $this->temp);
//// clear the temp image path
//            $this->temp = null;
//        }
//        $this->file = null;
//    }
//
//    /**
//     * @ORM\PostRemove()
//     */
//    public function removeUpload() {
//        $file = $this->getAbsolutePath();
//        if ($file) {
//            unlink($file);
//        }
//    }
//
//    /**
//     * Get file.
//     *
//     * @return UploadedFile
//     */
//    public function getFile() {
//        return $this->file;
//    }
//
//    public function getAbsolutePath() {
//        return null === $this->path ? null : $this->getUploadRootDir() . '/' . $this->path;
//    }
////
//    public function getWebPath() {
//        return null === $this->image ? null : /* 'uploads/profile_pictures' . '/' . */ $this->image;
//    }
//
//    protected function getUploadRootDir() {
//// the absolute directory path where uploaded
//// documents should be saved
//
//        return __DIR__ . '/../../../../web/' . $this->getUploadDir();
//    }
//
//    protected function getUploadDir() {
//// get rid of the __DIR__ so it doesn't screw up
//// when displaying uploaded doc/image in the view.
//        return 'uploads';
//    }

    /**
     * Set theme
     *
     * @param string $theme
     * @return User
     */
    public function setTheme($theme) {
        $this->theme = $theme;

        return $this;
    }

    /**
     * Get theme
     *
     * @return string
     */
    public function getTheme() {
        return $this->theme;
    }

    /* SERIALIZABLE NEEDS THESE */

    public function serialize() {
        return serialize(
                array($this->id, $this->username, $this->password
                )
        );
    }

    public function unserialize($serialized) {
        list($this->id, $this->username, $this->password) = unserialize($serialized);
    }

    function validations(ExecutionContext $context) {
//        $context->buildViolation('Para ser segundo jefe debe ser reserva')->atPath('name')->addViolation();
    }

    public function __toString() {
        return $this->name . ' ' . $this->lastname;
    }

}
