<?php

namespace App\Controller;

use App\Entity\Usuario;
use App\Entity\Escribano;
use App\Form\EscribanoType;
use App\Repository\EscribanoRepository;
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
 * @Route("/escribano")
 */
class EscribanoController extends AbstractController
{
    /**
     * @Route("/", name="escribano_index", methods={"GET"})
     */
    public function index(EscribanoRepository $escribanoRepository): Response
    {
        $em = $this->getDoctrine()->getManager();
        $escribanos = $em->getRepository('App:Escribano')->findAll();
        $escribanos = array('escribanos' => $escribanos);
        $encoders = array(new JsonEncoder());
        //$normalizers = array(new ObjectNormalizer());
        $normalizers = array((new ObjectNormalizer())->setIgnoredAttributes(
            [
                "__initializer__",
                "__cloner__",
                "__isInitialized__"
            ]
        ));
        $serializer = new Serializer($normalizers, $encoders);
        $response = new Response();
        $response->setContent($serializer->serialize($escribanos, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

        /*return $this->render('escribano/index.html.twig', [
            'escribanos' => $escribanoRepository->findAll(),
        ]);*/
    }

    /**
     * @Route("/new", name="escribano_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        //recupero atributos
        $data = json_decode($request->getContent(), true);
        $escribano = new Escribano();
        $escribano->setDni($data['dni']);
        $escribano->setApellido($data['apellido']);
        $escribano->setNombre($data['nombre']);

        $fecha = new \DateTime($data['fechaNacimiento']);
        $escribano->setFechaNacimiento($fecha);
        $escribano->setDireccion($data['direccion']);
        $escribano->setMatricula($data['matricula']);
        $escribano->setCargo($data['cargo']);
        $escribano->setEstado($data['estado']);

        //confecciono una entidad escribania para asignar a escribano
        $escribaniaArray = $data['escribania'];
        $idEscribania = $escribaniaArray['id'];
        $em = $this->getDoctrine()->getManager();
        $escribania = $em->getRepository("App:Escribania")->find($idEscribania);
        $escribano->setEscribania($escribania);

        //confecciono una entidad usuario para asignar a escribano
        $usuarioArray = $data['usuario'];
        //creamos un array criteria con los parametros de busqueda de un usuario en la bd
        //$criteria = array('userName' => $usuarioArray['userName'], 'password' => $usuarioArray['password']);
        //$em = $this->getDoctrine()->getManager();
        //$usuario = $em->getRepository("App:Usuario")->findBy($criteria);

        $usuario = new Usuario();
        $usuario->setUserName($usuarioArray['userName']);
        $usuario->setPassword($usuarioArray['password']);
        $usuario->setPerfil($usuarioArray['perfil']);
        if (isset($usuarioArray['foto']))
            $usuario->setFoto($usuarioArray['foto']);
        $escribano->setUsuario($usuario);

        $em->persist($usuario);

        //$escribano->setUsuario($usuario[0]);
        $em->persist($escribano);
        $em->flush();

        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * @Route("/{id}", name="escribano_show", methods={"GET"})
     */
    public function show(Escribano $escribano): Response
    {
        return $this->render('escribano/show.html.twig', [
            'escribano' => $escribano,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="escribano_edit", methods={"GET","POST"})
     */
    public function edit($id, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager();
        $escribano = $em->getRepository('App:Escribano')->find($id);
        $escribano->setDni($data['dni']);
        $escribano->setApellido($data['apellido']);
        $escribano->setNombre($data['nombre']);
        if (empty($data['fechaNacimiento'])) {
            $fecha = new \DateTime($data['fechaNacimiento']);
            $escribano->setFechaNacimiento($fecha);
        }
        if (empty($data['direccion'])) {
            $escribano->setDireccion($data['direccion']);
        }
        $escribano->setMatricula($data['matricula']);
        $escribano->setCargo($data['cargo']);
        $escribano->setEstado($data['estado']);
        //recupero la entidad escribania de la BD que se corresponde con la id
        //que se recibe en formato JSON y le asigno a la propiedad escribania de escribano.
        $escribaniaArray = $data['escribania'];
        $idEscribania = $escribaniaArray['id'];
        $escribania = $em->getRepository("App:Escribania")->find($idEscribania);
        $escribano->setEscribania($escribania);
        //guardo en la BD la entidad escribano modificada.
        $em->persist($escribano);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * @Route("/{id}", name="escribano_delete", methods={"DELETE"})
     */
    public function delete($id): Response
    {
        $em = $this->getDoctrine()->getManager();
        $escribano = $em->getRepository('App:Escribano')->find($id);
        if (!$escribano) {
            throw $this->createNotFoundException('id incorrecta');
        }
        $em->remove($escribano);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }
}
