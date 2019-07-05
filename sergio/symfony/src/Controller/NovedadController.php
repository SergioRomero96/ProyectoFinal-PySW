<?php

namespace App\Controller;

use App\Entity\Novedad;
use App\Form\NovedadType;
use App\Repository\NovedadRepository;
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
 * @Route("/novedad")
 */
class NovedadController extends AbstractController
{
    /**
     * @Route("/novedadByEscribano", name="novedad_escribano", methods={"GET","POST"})
     */
    public function getNovedadesByEscribano(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $idUsuario = $data['id'];
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('App:Escribano');
        $query = $repository->createQueryBuilder('e')
            ->where('e.usuario = :usuario')
            ->setParameter('usuario', $idUsuario)
            ->getQuery();

        $escribanoArray = $query->getResult();

        $escribano = $escribanoArray[0]->getId();

        $repository = $em->getRepository('App:Novedad');
        $query = $repository->createQueryBuilder('n')
            ->where('n.escribano = :escribano')
            ->setParameter('escribano', $escribano)
            ->addOrderBy('n.id', 'DESC')
            ->getQuery();

        $novedades = $query->getResult();
        //$novedades = $escribanoArray;
        $novedades = array('novedades' => $novedades);
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
        $response->setContent($serializer->serialize($novedades, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/", name="novedad_index", methods={"GET"})
     */
    public function index(NovedadRepository $novedadRepository): Response
    {
        $em = $this->getDoctrine()->getManager();
        //$novedades = $em->getRepository('App:Novedad')->findAll();
        $repository = $em->getRepository('App:Novedad');
        $query = $repository->createQueryBuilder('n')
            ->addOrderBy('n.id', 'DESC')
            ->getQuery();
        $novedades = $query->getResult();

        $novedades = array('novedades' => $novedades);
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
        $response->setContent($serializer->serialize($novedades, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/new", name="novedad_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        //recupero atributos
        $data = json_decode($request->getContent(), true);
        $novedad = new Novedad();
        $novedad->setAsunto($data['asunto']);
        $novedad->setDescripcion($data['descripcion']);
        $fecha = new \DateTime($data['fecha']);
        $novedad->setFecha($fecha);

        $novedad->setEstado($data['estado']);
        if (isset($data['respuesta']))
            $novedad->setRespuesta($data['respuesta']);

        $em = $this->getDoctrine()->getManager();
        if (isset($data['escribano'])) {
            $escribanoArray = $data['escribano'];
            $idEscribano = $escribanoArray['id'];
            $escribano = $em->getRepository("App:Escribano")->find($idEscribano);
        }
        /*else {
            $data = json_decode($request->getContent(), true);
            $idUsuario = $data['id'];
            $em = $this->getDoctrine()->getManager();
            $repository = $em->getRepository('App:Escribano');
            $query = $repository->createQueryBuilder('e')
                ->where('e.usuario = :usuario')
                ->setParameter('usuario', $idUsuario)
                ->getQuery();

            $escribanoArray = $query->getResult();

            $escribano = $escribanoArray[0]->getId();
        }*/


        $novedad->setEscribano($escribano);

        $em->persist($novedad);
        $em->flush();

        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * @Route("/{id}", name="novedad_show", methods={"GET"})
     */
    public function show(Novedad $novedad): Response
    {
        return $this->render('novedad/show.html.twig', [
            'novedad' => $novedad,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="novedad_edit", methods={"GET","POST"})
     */
    public function edit($id, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager();
        $novedad = $em->getRepository('App:Novedad')->find($id);
        $novedad->setAsunto($data['asunto']);
        $novedad->setDescripcion($data['descripcion']);
        $novedad->setEstado($data['estado']);
        if (isset($data['respuesta']))
            $novedad->setRespuesta($data['respuesta']);
        //$fecha = new \DateTime($data['fecha']);
        //$novedad->setFecha($fecha);
        //recupero la entidad escribano de la BD que se corresponde con la id
        //que se recibe en formato JSON y le asigno a la propiedad escribano de escribano.
        /*$escribanoArray = $data['escribano'];
        $idEscribano = $escribanoArray['id'];
        $novedad = $em->getRepository("App:Escribano")->find($idEscribano);
        $novedad->setEscribano($novedad);*/
        //guardo en la BD la entidad escribano modificada.
        $em->persist($novedad);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * @Route("/{id}", name="novedad_delete", methods={"DELETE"})
     */
    public function delete($id): Response
    {
        $em = $this->getDoctrine()->getManager();
        $novedad = $em->getRepository('App:Novedad')->find($id);
        if (!$novedad) {
            throw $this->createNotFoundException('id incorrecta');
        }
        $em->remove($novedad);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }
}
