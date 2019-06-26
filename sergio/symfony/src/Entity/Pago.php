<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PagoRepository")
 */
class Pago
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $fecha;

    /**
     * @ORM\Column(type="float")
     */
    private $importe;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Escribano")
     * @ORM\JoinColumn(nullable=false)
     */
    private $escribano;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getImporte(): ?float
    {
        return $this->importe;
    }

    public function setImporte(float $importe): self
    {
        $this->importe = $importe;

        return $this;
    }

    public function getEscribano(): ?Escribano
    {
        return $this->escribano;
    }

    public function setEscribano(?Escribano $escribano): self
    {
        $this->escribano = $escribano;

        return $this;
    }
}
