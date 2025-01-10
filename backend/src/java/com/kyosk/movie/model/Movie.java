package com.kyosk.movie.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Year;

@Data
@Document(collection = "movies")
public class Movie {
    @Id
    private String id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Genre is required")
    private String genre;

    @NotNull(message = "Release year is required")
    @Min(value = 1888, message = "Release year must be 1888 or later")
    private Integer releaseYear;

    public void validate() {
        if (releaseYear > Year.now().getValue()) {
            throw new IllegalArgumentException("Release year cannot be in the future");
        }
    }
}
