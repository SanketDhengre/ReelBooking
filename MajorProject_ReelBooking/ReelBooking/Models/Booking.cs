using System;
using System.Collections.Generic;

namespace ReelBooking.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public int? UserId { get; set; }

    public int? MovieId { get; set; }

    public string? SelectedSeats { get; set; }

    public DateTime? BookingDate { get; set; }

    public decimal? TotalPrice { get; set; }

    public DateTime? MovieTime { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Movies? Movie { get; set; }

    public virtual User? User { get; set; }
}
