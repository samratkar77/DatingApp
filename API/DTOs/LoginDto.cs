using System;

namespace API.DTOs;

public class LoginDto
{
    // public required string Username { get; set; }
    public required string Password { get; set; }
    public required string Email { get; set; }

}
