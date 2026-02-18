package br.tiagolopes.exception;

import br.tiagolopes.core.ErrorResponse;
import br.tiagolopes.core.ErrorType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class GlobalExceptionHandler implements ExceptionMapper<Throwable> {
    @Override
    public Response toResponse(Throwable exception) {
        Throwable current = exception;
        while (current != null) {
            if (current instanceof jakarta.validation.ConstraintViolationException cve) {
                String errorMessage = cve.getConstraintViolations().iterator().next().getMessage();
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(errorMessage, ErrorType.VALIDATION))
                    .build();
            }

            if (current instanceof org.hibernate.exception.ConstraintViolationException) {
                return Response.status(Response.Status.CONFLICT)
                    .entity(new ErrorResponse("This record is being used and cannot be deleted.", ErrorType.CONFLICT))
                    .build();
            }

            if (current instanceof IllegalArgumentException) {
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(current.getMessage(), ErrorType.VALIDATION))
                    .build();
            }

            current = current.getCause();
        }

        exception.printStackTrace();
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
            .entity(new ErrorResponse("Internal Server Error.", ErrorType.INTERNAL))
            .build();
    }
}
