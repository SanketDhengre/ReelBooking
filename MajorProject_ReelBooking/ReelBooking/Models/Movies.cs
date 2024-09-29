using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReelBooking.Models
{
    public class Movies
    {
        [Key]
        public int MovieId { get; set; }

        public string Title { get; set; } = null!;

        public string? Genre { get; set; }

        public string? Director { get; set; }

        public string? Language { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public int? AvailableSeats { get; set; }

        public decimal? TicketPrice { get; set; }

        public decimal? AverageRating { get; set; }

        public string? Description { get; set; }

        public int? ManagerId { get; set; }

        public string? ImageUrl { get; set; }

        public bool IsDeleted { get; set; }

        


    }
}
