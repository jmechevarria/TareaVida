<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace UserBundle\Listener;

use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Router;

class LoginListener {
//    private $role = null;
//    private $router;
//
////
//    public function __construct(Router $router) {
//        $this->router = $router;
//    }
//
////
//    public function onSecurityInteractiveLogin(InteractiveLoginEvent $event) {
//        $this->role = $event->getAuthenticationToken()->getUser()->getRole()->getName();
//    }
//
////
//    public function onKernelResponse(FilterResponseEvent $event) {
//        if ($this->role !== null) {
//            if ($this->role === 'ROLE_SUPER_ADMIN')
//                $url = $this->router->generate('personnel');
//            else
//                $url = $this->router->generate('homepage');
//
//            $event->setResponse(new RedirectResponse($url));
//        }
//    }
}
