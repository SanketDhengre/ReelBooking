using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ReelBooking.Models;

namespace ReelBooking.Data;

public partial class MajorProjectContext : DbContext
{
    public MajorProjectContext()
    {
    }

    public MajorProjectContext(DbContextOptions<MajorProjectContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admin { get; set; }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<Movies> Movies { get; set; }

    public virtual DbSet<RatingAndReview> RatingAndReviews { get; set; }

    public virtual DbSet<TheaterManager> TheaterManagers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserReward> UserRewards { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        => optionsBuilder.UseSqlServer("Data Source=GVC1273\\MSSQLSERVER2019;Initial Catalog=MajorProject;User ID=sa;Password=cybage@123456;Encrypt=False;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("PK__Admins__719FE488BD05C581");

            entity.HasIndex(e => e.Email, "UQ__Admins__C9F284562F01EEBA").IsUnique();

            entity.Property(e => e.AdminId).ValueGeneratedNever();
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(50);
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PK__Bookings__73951AED7926A918");

            entity.Property(e => e.BookingDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.MovieTime).HasColumnType("datetime");
            entity.Property(e => e.SelectedSeats).HasMaxLength(50);
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(10, 2)");

            //entity.HasOne(d => d.Movie).WithMany(p => p.Bookings)
            //    .HasForeignKey(d => d.MovieId)
            //    .HasConstraintName("FK__Bookings__MovieI__6FE99F9F");

            entity.HasOne(d => d.User).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Bookings__UserId__6EF57B66");
        });

        modelBuilder.Entity<Movies>(entity =>
        {
            entity.HasKey(e => e.MovieId).HasName("PK__Movies__4BD2941A565221A2");

            entity.Property(e => e.AverageRating)
                .HasDefaultValueSql("((0.0))")
                .HasColumnType("decimal(3, 2)");
            entity.Property(e => e.Director).HasMaxLength(50);
            entity.Property(e => e.Genre).HasMaxLength(50);
            entity.Property(e => e.ImageUrl).HasMaxLength(255);
            entity.Property(e => e.Language).HasMaxLength(50);
            entity.Property(e => e.ReleaseDate).HasColumnType("date");
            entity.Property(e => e.TicketPrice).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Title).HasMaxLength(100);
        });

        modelBuilder.Entity<RatingAndReview>(entity =>
        {
            entity.HasKey(e => e.RatingId).HasName("PK__RatingAn__FCCDF87C9F86DAD2");

            entity.Property(e => e.ReviewDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            //entity.HasOne(d => d.Movie).WithMany(p => p.RatingAndReviews)
            //    .HasForeignKey(d => d.MovieId)
            //    .HasConstraintName("FK__RatingAnd__Movie__68487DD7");

            entity.HasOne(d => d.User).WithMany(p => p.RatingAndReviews)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__RatingAnd__UserI__693CA210");
        });

        modelBuilder.Entity<TheaterManager>(entity =>
        {
            entity.HasKey(e => e.ManagerId).HasName("PK__TheaterM__3BA2AAE190FC93EA");

            entity.ToTable("TheaterManager");

            entity.HasIndex(e => e.Email, "UQ__TheaterM__A9D1053416DF176D").IsUnique();

            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.Phone).HasMaxLength(15);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C52AA7BD0");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D105342F433373").IsUnique();

            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.Phone).HasMaxLength(15);
        });

        modelBuilder.Entity<UserReward>(entity =>
        {
            entity.HasKey(e => e.RewardId).HasName("PK__UserRewa__825015B907DC3E8F");

            entity.Property(e => e.Points).HasDefaultValueSql("((0))");

            entity.HasOne(d => d.User).WithMany(p => p.UserRewards)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__UserRewar__UserI__6383C8BA");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
