<?php

namespace App\Controller;

use App\Entity\Usuario;
use App\Form\UsuarioType;
use App\Repository\UsuarioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/*AGREGADOs*/
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
/*AGREGADOs*/

/**
 * @Route("/usuario")
 */
class UsuarioController extends AbstractController
{

    /**
     * @Route("/login", name="usuario_login", methods={"GET","POST"})
     */
    public function login(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        //creamos un usuario
        $userName = $data['userName'];
        $userpassword = $data['password'];
        //creamos un array criteria con los parametros de busqueda de un usuario en la bd
        $criteria = array('userName' => $userName, 'password' => $userpassword);
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("App:Usuario")->findBy($criteria);
        if ($user != null) {
            $result['status'] = 'ok';
            $result['userName'] = $user[0]->getUserName();
            $result['perfil'] = $user[0]->getPerfil();
        } else {
            $result['status'] = 'bad';
            $result['userName'] = '';
            $result['perfil'] = '';
        }
        return new Response(json_encode($result), 200);
    }

    /**
     * @Route("/", name="usuario_index", methods={"GET"})
     */
    public function index(UsuarioRepository $usuarioRepository): Response
    {
        $em = $this->getDoctrine()->getManager();
        $usuarios = $em->getRepository('App:Usuario')->findAll();
        $usuarios = array('usuarios' => $usuarios);
        $encoders = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $response = new Response();
        $response->setContent($serializer->serialize($usuarios, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

        /*return $this->render('usuario/index.html.twig', [
            'usuarios' => $usuarioRepository->findAll(),
        ]);*/
    }

    /**
     * @Route("/new", name="usuario_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        //recupero atributos
        $data = json_decode($request->getContent(), true);

        $usuario = new Usuario();
        $usuario->setUserName($data['userName']);
        $usuario->setPassword($data['password']);
        $usuario->setPerfil($data['perfil']);

        $em = $this->getDoctrine()->getManager();

        $em->persist($usuario);
        $em->flush();

        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * @Route("/{id}", name="usuario_show", methods={"GET"})
     */
    public function show(Usuario $usuario): Response
    {
        return $this->render('usuario/show.html.twig', [
            'usuario' => $usuario,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="usuario_edit", methods={"GET","POST"})
     */
    public function edit($id, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager();
        $usuario = $em->getRepository('App:Usuario')->find($id);
        $usuario->setUserName($data['userName']);
        $usuario->setPassword($data['password']);
        $usuario->setPerfil($data['perfil']);

        //guardo en la BD la entidad usuario modificada.
        $em->persist($usuario);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * @Route("/{id}", name="usuario_delete", methods={"DELETE"})
     */
    public function delete($id): Response
    {
        $em = $this->getDoctrine()->getManager();
        $usuario = $em->getRepository('App:Usuario')->find($id);
        if (!$usuario) {
            throw $this->createNotFoundException('id incorrecta');
        }
        $em->remove($usuario);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }
}
