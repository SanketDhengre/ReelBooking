using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace ReelBooking.Models;

public partial class TheaterManager
{
    public int ManagerId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public string Password { get; set; } = null!;

    public string Status { get; set; } = null!;

    [DefaultValue(false)] // Set the default value of isDeleted to false
    public bool IsDeleted { get; set; }

}
