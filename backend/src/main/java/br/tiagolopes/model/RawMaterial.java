package br.tiagolopes.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class RawMaterial extends PanacheEntity {
    @NotBlank(message = "name is required.")
    @Column(nullable = false)
    public String name;

    @NotNull(message = "stockQuantity is required.")
    @Min(value = 0, message = "stockQuantity cannot be less than 0.")
    @Column(nullable = false)
    public Integer stockQuantity;

    @NotBlank(message = "unit is required.")
    @Column(nullable = false, length = 10)
    public String unit;

    public static RawMaterial findByName(String name) {
        return find("name", name).firstResult();
    }
}
