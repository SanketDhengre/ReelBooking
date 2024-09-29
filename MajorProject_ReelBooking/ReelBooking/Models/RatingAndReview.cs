using System;
using System.Collections.Generic;

namespace ReelBooking.Models;

public partial class RatingAndReview
{
    public int RatingId { get; set; }

    public int? MovieId { get; set; }

    public int? UserId { get; set; }

    public int? Rating { get; set; }

    public string? ReviewText { get; set; }

    public DateTime? ReviewDate { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Movies? Movie { get; set; }

    public virtual User? User { get; set; }
}
