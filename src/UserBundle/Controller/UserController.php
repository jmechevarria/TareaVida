<?php

namespace UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use UserBundle\Entity\User;
use UserBundle\Form\UserType;

//use Symfony\Component\Security\Core\SecurityContext;

/**
 * User controller.
 *
 */
class UserController extends Controller {

    /**
     * Lists all User entities.
     *
     */
    public function indexAction() {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('UserBundle:User')->findAll();

        return $this->render('UserBundle:User:index.html.twig', array(
                    'entities' => $entities,
        ));
    }

    /**
     * Creates a new User entity.
     *
     */
    public function createAction(Request $request) {
        $entity = new User();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $encoder = $this->get('security.encoder_factory')->getEncoder($entity);
            $entity->setSalt(md5(time()));
            $encodedPassword = $encoder->encodePassword($entity->getPassword(), $entity->getSalt());
            $entity->setPassword($encodedPassword);

            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('user_show', array('id' => $entity->getId())));
        }

        $errors = array();
        foreach ($form as $field) {
            if ($field->getErrors()) {
                $name = $field->getName();
                $errors [$name] = $field->getErrors();
                $errors[$name] = $errors[$name][0]->getMessage();
            }
        }


        return $this->render('UserBundle:User:new.html.twig', array(
                    'entity' => $entity,
                    'form' => $form->createView(),
                    'errors' => $errors
        ));
    }

    /**
     * Creates a form to create a User entity.
     *
     * @param User $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(User $entity) {
        $role = $this->get('security.context')->getToken()->getUser()->getRole()->getName();
        $form = $this->createForm(new UserType($role), $entity, array(
            'action' => $this->generateUrl('user_create'),
            'method' => 'POST',
        ));

        return $form;
    }

    /**
     * Displays a form to create a new User entity.
     *
     */
    public function newAction() {
        $entity = new User();

        $form = $this->createCreateForm($entity);

        return $this->render('UserBundle:User:new.html.twig', array(
                    'entity' => $entity,
                    'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a User entity.
     *
     */
    public function showAction($id) {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('UserBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }


        return $this->render('UserBundle:User:show.html.twig', array(
                    'entity' => $entity,
        ));
    }

    /**
     * Displays a form to edit an existing User entity.
     *
     */
    public function editAction($id) {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('UserBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        $editForm = $this->createEditForm($entity);

        return $this->render('UserBundle:User:edit.html.twig', array(
                    'entity' => $entity,
                    'edit_form' => $editForm->createView(),
        ));
    }

    /**
     * Creates a form to edit a User entity.
     *
     * @param User $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createEditForm(User $entity) {
        $role = $this->get('security.context')->getToken()->getUser()->getRole()->getName();
        $form = $this->createForm(new UserType($role), $entity, array(
            'action' => $this->generateUrl('user_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));


        return $form;
    }

    /**
     * Edits an existing User entity.
     *
     */
    public function updateAction(Request $request, $id) {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('UserBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        $editForm = $this->createEditForm($entity);
        $oldPassword = $editForm->getData()->getPassword();
        $editForm->submit($request);

        if ($editForm->isValid()) {
            if ($editForm->get('password') !== null)
                if (null === $entity->getPassword()) {
                    $entity->setPassword($oldPassword);
                } else {
                    $encoder = $this->get('security.encoder_factory')->getEncoder($entity);
                    $encodedPassword = $encoder->encodePassword($entity->getPassword(), $entity->getSalt());
                    $entity->setPassword($encodedPassword);
                }

            $em->flush();

            return $this->redirect($this->generateUrl('user_show', array('id' => $id)));
        }

        $errors = array();
        foreach ($editForm as $field) {
            if ($field->getConfig()->getType()->getName() != 'repeated') {
                if ($field->getErrors()) {
                    $name = $field->getName();
                    $errors [$name] = $field->getErrors();
                    $errors[$name] = $errors[$name][0]->getMessage();
                }
            } else {
                $grandchildren = $field->all();
                foreach ($grandchildren as $g) {
                    if ($g->getErrors()) {
                        $name = $field->getName() . '_' . $g->getName();
                        $errors [$name] = $g->getErrors();
                        $errors[$name] = $errors[$name][0]->getMessage();
                    }
                }
            }
        }

        return $this->render('UserBundle:User:edit.html.twig', array(
                    'entity' => $entity,
                    'edit_form' => $editForm->createView(),
                    'errors' => $errors
        ));
    }

    /**
     * Deletes a User entity.
     *
     */
    public function deleteAction(Request $request, $id) {
        $form = $this->createDeleteForm($id);
        $form->submit($request);

        $em = $this->getDoctrine()->getManager();
        $entity = $em->getRepository('UserBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }
        $sec_context = $this->get('security.context');

        if ($this->getUser() && $this->getUser()->getUsername() == $entity->getUsername()) {
            return $this->redirect($this->generateUrl('user'));
        }

//        if ($sec_context->getUser()) {
//            return $this->redirect($this->generateUrl('homepage'));
//        }

        $em->remove($entity);
        $em->flush();

        return $this->redirect($this->generateUrl('user'));
    }

    /**
     * Creates a form to delete a User entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id) {
        return $this->createFormBuilder()
                        ->setAction($this->generateUrl('user_delete', array('id' => $id)))
                        ->setMethod('DELETE')
                        ->getForm()
        ;
    }

    public function uploadAction(Request $request) {

    }

}
