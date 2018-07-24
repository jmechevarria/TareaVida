<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace UserBundle\Listener;

//use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
//use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Router;

class LogoutListener implements \Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface {

    private $router;

    public function __construct(Router $router) {
        $this->router = $router;
    }

    public function onLogoutSuccess(\Symfony\Component\HttpFoundation\Request $request) {
//        EMPTY TEMP FOLDER
        $dir_iter = new \DirectoryIterator('uploads/temp');
        foreach ($dir_iter as $fileinfo) {
            if (!$fileinfo->isDot())
                unlink($fileinfo->getPathname());
        }
//        EMPTY TEMP FOLDER - END

        return new RedirectResponse($this->router->generate('homepage'));
    }

}
