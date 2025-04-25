package pf.socredo.socmarket.dto.response;

public class UserResponseDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String login;
    private String role;

    // Constructeurs
    public UserResponseDTO(Long userId, String firstName, String lastName, String login, String role) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.login = login;
        this.role = role;
    }

    // Getters uniquement (pas besoin de setters pour un DTO de réponse)
    public Long getUserId() { return userId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getLogin() { return login; }
    public String getRole() { return role; }
}
