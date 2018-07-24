<?php

namespace UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Request;
use UserBundle\Form\UserType;
use UserBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\Common\Annotations\AnnotationReader;

class DefaultController extends Controller {

    protected $user;

    public function setContainer(\Symfony\Component\DependencyInjection\ContainerInterface $container = null) {
        parent::setContainer($container);
        $this->user = $this->get('security.context')->getToken()->getUser();

        if (!$this->user)
            throw $this->createNotFoundException('Unable to find User entity.');
    }

    public function loginAction(Request $r) {
        //DELETE DOWNLOAD FOLDER TEMPS
//        $dir_iter = new \DirectoryIterator('downloads');
//        foreach ($dir_iter as $fileinfo) {
//            if (!$fileinfo->isDot())
//                unlink($fileinfo->getPathname());
//        }
        //DELETE DOWNLOAD FOLDER TEMPS - END
//        $sec_context = $this->get('security.context');
//        if ($sec_context->isGranted('ROLE_USER')) {
//            return $this->redirect($this->generateUrl('homepage'));
//        }
//        $dev = $this->get('kernel')->getEnvironment();
        //DELETE CACHE FOLDER CONTENTS
//        $dir_iter = new \DirectoryIterator('../app/cache');
//        self::recursiveFolderRemoval($dir_iter);
//        $dir_iter = new \DirectoryIterator('../app/logs');
        /* foreach ($dir_iter as $fileinfo) {
          if (!$fileinfo->isDot())
          if ($dev === 'dev') {
          if ($fileinfo->getFilename() === 'prod.log')
          unlink($fileinfo->getPathname());
          }else if ($fileinfo->getFilename() === 'dev.log')
          unlink($fileinfo->getPathname());
          } */
        //DELETE CACHE FOLDER CONTENTS - END
        $session = $r->getSession();
        $error = $r->attributes->get(SecurityContext::AUTHENTICATION_ERROR, $session->get(
                        SecurityContext::AUTHENTICATION_ERROR)
        );

        return $this->render('base.html.twig', array(
                    'last_username' => $session->get(SecurityContext::LAST_USERNAME),
                    'error' => $error
        ));
    }

    public function accessDeniedAction($logged) {
        return $this->render('UserBundle:Default:access_denied.html.twig', array(
                    'msg' => $logged == 1 ? 'Su usuario no tiene acceso al recurso solicitado' :
                            'Introduzca usuario y clave para acceder al sistema'
        ));
    }

    public function signupAction(Request $request) {
        $security_context = $this->container->get('security.context');

        if ($security_context->getToken()->getUser() == 'anon.' ||
                $security_context->isGranted('ROLE_ADMIN')) {
            $em = $this->getDoctrine()->getManager();
            $uploads_directory = $this->getParameter('uploads_directory');

            $user = new User();
            $file_name = $request->getSession()->getId();
            $request_method = $request->getMethod();

            $default_profile_picture = $this->getParameter('default_profile_picture');
            $form = $this->createForm(UserType::class, $user);
            $form->handleRequest($request);
            $image = $user->getImage();
            $image_display_source = $default_profile_picture;

            if ($request_method !== 'POST') {
                if ($file_name && file_exists($uploads_directory . 'temp/' . $file_name))
                    unlink($uploads_directory . 'temp/' . $file_name);
            }
            else {
                if ($image) {
                    $chose_image = true;
                    $image->move(
                            $uploads_directory . 'temp/', $file_name
                    );
                    //Get the uploaded image and copy it inside temp folder before it is deleted from php's tmp folder
                    $image = new File($uploads_directory . 'temp/' . $file_name);

                    $image_display_source = 'uploads/temp/' . $file_name;
                }
                else if (file_exists($uploads_directory . 'temp/' . $file_name)) {
                    $chose_image = true;
                    $image = new File($uploads_directory . 'temp/' . $file_name);
                    $image_display_source = 'uploads/temp/' . $file_name;
                }
                else {
                    $chose_image = false;
                    $image = new \Symfony\Component\HttpFoundation\File\File(
                            $this->getParameter('default_profile_picture')
                    );

                    $image_display_source = $this->getParameter('default_profile_picture');
                }

                if ($chose_image) {
                    self::validateImage($image, $user, $form);
                }
                if ($form->isSubmitted() && $form->isValid()) {
                    $encoder = $this->get('security.password_encoder');
                    $encoded_password = $encoder->encodePassword($user, $user->getPassword());
                    $user->setPassword($encoded_password);

                    $role = $em->getRepository('UserBundle:Role')->find(2);
                    $user->setRole($role);

                    if ($chose_image) {
                        $user->setImage($file_name);
                        $image->move(
                                $uploads_directory . 'profile_pictures/', $file_name
                        );
                    }
                    else {
                        //move image from temp
//                    unlink($image);
                    }

                    $em->persist($user);
                    $em->flush();

                    if ($request->get('signup_type') == 'normal') {
                        $token = new UsernamePasswordToken(
                                $user, $user->getPassword(), 'f1', $user->getRoles()
                        );
                        $security_context->setToken($token);

                        return $this->render('base.html.twig');
                    }
                    else
                        return $this->redirect($request->getBaseUrl() . '/user/user/');
                }

                $errors = array();
                foreach ($form as $field) {
                    if ($field->getConfig()->getType()->getName() != 'repeated') {
                        if ($field->getErrors()->count() > 0) {
                            $name = $field->getName();
                            $errors[$name] = $field->getErrors();
                            $errors[$name] = $errors[$name][0]->getMessage();
                        }
                    }
                    else {
                        $grandchildren = $field->all();
                        foreach ($grandchildren as $g) {
                            if ($g->getErrors()->count()) {
                                $name = $field->getName() . '_' . $g->getName();
                                $errors [$name] = $g->getErrors();
                                $errors[$name] = $errors[$name][0]->getMessage();
                            }
                        }
                    }
                }
                return $this->render('UserBundle:Default:profile.html.twig', array(
                            'form' => $form->createView(),
                            'errors' => $errors,
                            'image_display_source' => $image_display_source
                ));
            }

            return $this->render('UserBundle:Default:profile.html.twig', array(
                        'form' => $form->createView(),
                        'image_display_source' => $image_display_source
            ));
        }

        return $this->redirect($this->generateUrl('homepage'));
    }

    static private function validateImage($image, $user, $form) {
        $image_size = $image->getSize();
        $refClass = new \ReflectionClass($user);
        $refProp = $refClass->getProperty('image');
        $annotations = (new AnnotationReader())->getPropertyAnnotations($refProp);

        if ($form->get('image')->getErrors()->count() === 0 && $image_size > $annotations[1]->maxSize)
            $form->get('image')->addError(new \Symfony\Component\Form\FormError(
                    'The file is too large (' . round($image_size / 1048576, 2) . ' MiB). '
                    . 'Allowed maximum size is ' . $annotations[1]->maxSize / 1048576 . ' MiB.'
                    )
            );
    }

    //REMEMBER TO DELETE TEMP FOLDER CONTENTS ON LOGOUT
    public function profileAction(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $user = $this->get('security.context')->getToken()->getUser();
//        \Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface $tsi
//        $user = $tsi->getToken();
//        var_dump($user);
//        die();
        $uploads_directory = $this->getParameter('uploads_directory');

        //get the name of the user's current image file if any exists
        $file_name = $user->getImage();
        if ($request->getMethod() !== 'POST') {
            if ($file_name && file_exists($uploads_directory . 'temp/' . $file_name))
                unlink($uploads_directory . 'temp/' . $file_name);
        }

        if ($file_name) {
            if (!file_exists($uploads_directory . 'temp/' . $file_name))
                copy($uploads_directory . 'profile_pictures/' . $file_name, $uploads_directory . 'temp/' . $file_name);

            $user->setImage(
                    new \Symfony\Component\HttpFoundation\File\File(
                    $uploads_directory . 'temp/' . $file_name
                    )
            );
            $image_display_source = $uploads_directory . 'temp/' . $file_name;
        }
        else {
//            $user->setImage(
//                    new \Symfony\Component\HttpFoundation\File\File(
//                    $this->getParameter('default_profile_picture')
//                    )
//            );
            $image_display_source = $this->getParameter('default_profile_picture');
            $file_name = md5($user->getId());
        }

        $form = $this->createForm(new UserType(false), $user);
        if ($request->getMethod() == 'POST') {
            $oldPassword = $form->getData()->getPassword();

            $form->handleRequest($request);
            $image = $user->getImage();

            if ($image) {
                $chose_image = true;
                $image->move(
                        $uploads_directory . 'temp/', $file_name
                );

                //Get the uploaded image and copy it inside temp folder before it is deleted from php's tmp folder
                $image = new File($uploads_directory . 'temp/' . $file_name);

                $image_display_source = 'uploads/temp/' . $file_name;
            }
            else if (file_exists($uploads_directory . 'temp/' . $file_name)) {
                $chose_image = true;
                $image = new File($uploads_directory . 'temp/' . $file_name);
                $image_display_source = 'uploads/temp/' . $file_name;
            }
            else {
                $chose_image = false;
                $image = new \Symfony\Component\HttpFoundation\File\File(
                        $this->getParameter('default_profile_picture')
                );

                $image_display_source = $this->getParameter('default_profile_picture');
            }

            if ($chose_image) {
                self::validateImage($image, $user, $form);
            }

            if ($form->isSubmitted() && $form->isValid()) {
                if (null === $user->getPassword()) {
                    $user->setPassword($oldPassword);
                }
                else {
                    $encoder = $this->get('security.password_encoder');
                    $encoded_password = $encoder->encodePassword($user, $user->getPassword());
                    $user->setPassword($encoded_password);
                }

                if ($chose_image) {
                    $user->setImage($file_name);
                    $image->move(
                            $uploads_directory . 'profile_pictures/', $file_name
                    );
                }
                else {
                    //move image from temp
//                    unlink($image);
                }

                $em->flush();

                return $this->redirect($this->generateUrl('homepage'));
            }
            $errors = array();

            foreach ($form as $field) {
                if ($field->getConfig()->getType()->getName() != 'repeated') {
                    if ($field->getErrors()->count() > 0) {
                        $name = $field->getName();
                        $errors [$name] = $field->getErrors();
                        $errors[$name] = $errors[$name][0]->getMessage();
                    }
                }
                else {
                    $grandchildren = $field->all();
                    foreach ($grandchildren as $g) {
                        if ($g->getErrors()->count() > 0) {
                            $name = $field->getName() . '_' . $g->getName();
                            $errors [$name] = $g->getErrors();
                            $errors[$name] = $errors[$name][0]->getMessage();
                        }
                    }
                }
            }

            return $this->render('UserBundle:Default:profile.html.twig', array(
                        'user' => $user,
                        'form' => $form->createView(),
                        'errors' => $errors,
                        'image_display_source' => $image_display_source
            ));
        }

        return $this->render('UserBundle:Default:profile.html.twig', array(
                    'user' => $user,
                    'form' => $form->createView(),
                    'image_display_source' => $image_display_source
        ));
    }

    public function deleteSeveralAction(Request $request) {
        if ($request->isXmlHttpRequest()) {
            $em = $this->getDoctrine()->getManager();

            $id_list = $request->get('id_list');
            $entity_class_name = $request->get('entity_class_name');

            if ($this->user->getRole()->getName() === 'ROLE_ADMIN') {
                if (!empty($id_list)) {
                    $deleted = array();

                    foreach ($id_list as $id) {
                        $entity = $em->getRepository($request->get('bundle_name') . ':' . $entity_class_name)->find($id);
                        if (!$entity) {
                            return new \Symfony\Component\HttpFoundation\Response(
                                    'La entidad ' . $entity_class_name . ' con identificador ' . $id . ' no existe', 300);
                        }

                        $em->remove($entity);

                        $deleted[] = $id;
                    }


                    $em->flush();
                }
            }

            return new \Symfony\Component\HttpFoundation\Response($this->generateUrl(strtolower($entity_class_name)));
        }
        return $this->redirect($this->generateUrl('homepage'));
    }

}
