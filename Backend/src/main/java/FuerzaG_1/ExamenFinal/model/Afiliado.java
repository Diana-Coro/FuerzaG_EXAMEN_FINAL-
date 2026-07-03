package FuerzaG_1.ExamenFinal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "afiliados")
public class Afiliado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(name = "tipo_afiliado", nullable = false)
    private String tipoAfiliado;

    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora;

    // Constructores
    public Afiliado() {}

    public Afiliado(Long id, String nombre, String tipoAfiliado, LocalDateTime fechaHora) {
        this.id = id;
        this.nombre = nombre;
        this.tipoAfiliado = tipoAfiliado;
        this.fechaHora = fechaHora;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTipoAfiliado() { return tipoAfiliado; }
    public void setTipoAfiliado(String tipoAfiliado) { this.tipoAfiliado = tipoAfiliado; }

    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }
}