using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace ReelBooking.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public string Password { get; set; } = null!;

    [DefaultValue(false)] // Set the default value of isDeleted to false
    public bool IsDeleted { get; set; }

    public virtual ICollection<Booking> Bookings { get; } = new List<Booking>();

    public virtual ICollection<RatingAndReview> RatingAndReviews { get; } = new List<RatingAndReview>();

    public virtual ICollection<UserReward> UserRewards { get; } = new List<UserReward>();
}
