using System;
using System.Collections.Generic;

namespace ReelBooking.Models;

public partial class UserReward
{
    public int RewardId { get; set; }

    public int? UserId { get; set; }

    public int? Points { get; set; }

    public bool IsDeleted { get; set; }

    public virtual User? User { get; set; }
}
