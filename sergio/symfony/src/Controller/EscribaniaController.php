<?php

namespace App\Controller;

use App\Entity\Escribania;
use App\Form\EscribaniaType;
use App\Repository\EscribaniaRepository;
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
 * @Route("/escribania")
 */
class EscribaniaController extends AbstractController
{
    /**
     * @Route("/", name="escribania_index", methods={"GET"})
     */
    public function index(EscribaniaRepository $escribaniaRepository): Response
    {
        $em = $this->getDoctrine()->getManager();
        $escribanias = $em->getRepository('App:Escribania')->findAll();
        $escribanias = array('escribanias' => $escribanias);
        $encoders = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $response = new Response();
        $response->setContent($serializer->serialize($escribanias, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

        /*return $this->render('escribania/index.html.twig', [
            'escribanias' => $escribaniaRepository->findAll(),
        ]);*/
    }

    /**
     * @Route("/new", name="escribania_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        //recupero atributos
        $data = json_decode($request->getContent(), true);

        $escribania = new Escribania();
        $escribania->setNombre($data['nombre']);
        $escribania->setDireccion($data['direccion']);
        $escribania->setLocalidad($data['localidad']);
        $escribania->setTelefono($data['telefono']);
        if(isset($data['foto']))
            $escribania->setFoto($data['foto']);
        $em = $this->getDoctrine()->getManager();

        $em->persist($escribania);
        $em->flush();

        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * @Route("/{id}", name="escribania_show", methods={"GET"})
     */
    public function show(Escribania $escribanium): Response
    {
        return $this->render('escribania/show.html.twig', [
            'escribanium' => $escribanium,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="escribania_edit", methods={"GET","POST"})
     */
    public function edit($id, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager();
        $escribania = $em->getRepository('App:Escribania')->find($id);
        $escribania->setNombre($data['nombre']);
        $escribania->setDireccion($data['direccion']);
        $escribania->setLocalidad($data['localidad']);
        $escribania->setTelefono($data['telefono']);
        $escribania->setFoto($data['foto']);

        //guardo en la BD la entidad escribania modificada.
        $em->persist($escribania);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * @Route("/{id}", name="escribania_delete", methods={"DELETE"})
     */
    public function delete($id): Response
    {
        $em = $this->getDoctrine()->getManager();
        $escribania = $em->getRepository('App:Escribania')->find($id);
        if (!$escribania) {
            throw $this->createNotFoundException('id incorrecta');
        }
        $em->remove($escribania);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }
}
