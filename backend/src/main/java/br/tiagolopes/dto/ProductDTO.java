package br.tiagolopes.dto;

import java.util.List;

public record ProductDTO(
    String name,
    Double price,
    List<CompositionItemDTO> composition
) {}

