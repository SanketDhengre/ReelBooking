USE [master]
GO
/****** Object:  Database [ReelBooking_MajorApp]    Script Date: 9/2/2024 12:56:34 PM ******/
CREATE DATABASE [ReelBooking_MajorApp]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ReelBooking_MajorApp', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER2019\MSSQL\DATA\ReelBooking_MajorApp.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ReelBooking_MajorApp_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER2019\MSSQL\DATA\ReelBooking_MajorApp_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [ReelBooking_MajorApp] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ReelBooking_MajorApp].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ReelBooking_MajorApp] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET ARITHABORT OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET RECOVERY FULL 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET  MULTI_USER 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ReelBooking_MajorApp] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ReelBooking_MajorApp] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ReelBooking_MajorApp', N'ON'
GO
ALTER DATABASE [ReelBooking_MajorApp] SET QUERY_STORE = OFF
GO
USE [ReelBooking_MajorApp]
GO
/****** Object:  Table [dbo].[Admins]    Script Date: 9/2/2024 12:56:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admins](
	[AdminId] [int] NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AdminId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bookings]    Script Date: 9/2/2024 12:56:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bookings](
	[BookingId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[MovieId] [int] NULL,
	[SelectedSeats] [nvarchar](50) NULL,
	[BookingDate] [datetime] NULL,
	[TotalPrice] [decimal](10, 2) NULL,
	[MovieTime] [datetime] NULL,
	[IsDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[BookingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Movies]    Script Date: 9/2/2024 12:56:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Movies](
	[MovieId] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
	[Genre] [nvarchar](50) NULL,
	[Director] [nvarchar](50) NULL,
	[Language] [nvarchar](50) NULL,
	[ReleaseDate] [date] NULL,
	[AvailableSeats] [int] NULL,
	[TicketPrice] [decimal](10, 2) NULL,
	[AverageRating] [decimal](3, 2) NULL,
	[Description] [nvarchar](max) NULL,
	[ManagerId] [int] NULL,
	[ImageUrl] [nvarchar](255) NULL,
	[IsDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MovieId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RatingAndReviews]    Script Date: 9/2/2024 12:56:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RatingAndReviews](
	[RatingId] [int] IDENTITY(1,1) NOT NULL,
	[MovieId] [int] NULL,
	[UserId] [int] NULL,
	[Rating] [int] NULL,
	[ReviewText] [nvarchar](max) NULL,
	[ReviewDate] [datetime] NULL,
	[IsDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RatingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TheaterManager]    Script Date: 9/2/2024 12:56:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TheaterManager](
	[ManagerId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Phone] [nvarchar](15) NULL,
	[Password] [nvarchar](50) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ManagerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRewards]    Script Date: 9/2/2024 12:56:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRewards](
	[RewardId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[Points] [int] NULL,
	[IsDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RewardId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 9/2/2024 12:56:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Phone] [nvarchar](15) NULL,
	[Password] [nvarchar](50) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Bookings] ON 

INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (15, 1, 1, N'A1, A2', CAST(N'2024-03-01T10:18:21.583' AS DateTime), CAST(20.00 AS Decimal(10, 2)), CAST(N'2024-03-01T15:00:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (16, 2, 3, N'B5, B6, B7', CAST(N'2024-03-01T10:18:21.583' AS DateTime), CAST(30.50 AS Decimal(10, 2)), CAST(N'2024-03-02T18:30:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (17, 3, 5, N'C3, C4, C5, C6', CAST(N'2024-03-01T10:18:21.583' AS DateTime), CAST(45.75 AS Decimal(10, 2)), CAST(N'2024-03-03T20:00:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (18, 2, 1, N'A1 ', CAST(N'2024-03-01T00:00:00.000' AS DateTime), CAST(20.00 AS Decimal(10, 2)), CAST(N'2024-03-03T10:29:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (26, 1, 1, N'B2 C3', CAST(N'2024-03-13T00:00:00.000' AS DateTime), CAST(40.00 AS Decimal(10, 2)), CAST(N'2024-03-15T10:31:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (27, 1, 2, N'A5 B7 C8', CAST(N'2024-03-01T00:00:00.000' AS DateTime), CAST(50.00 AS Decimal(10, 2)), CAST(N'2024-03-14T10:33:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (28, 1, 1, N'A2', CAST(N'2024-03-01T10:47:00.000' AS DateTime), CAST(80.00 AS Decimal(10, 2)), CAST(N'2024-03-15T18:48:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (33, 1, 1, N'A2', CAST(N'2024-03-01T11:45:00.000' AS DateTime), CAST(200.00 AS Decimal(10, 2)), CAST(N'2024-03-08T11:46:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (34, 1, 1, N'A1 B2 C3', CAST(N'2024-03-01T11:48:00.000' AS DateTime), CAST(200.00 AS Decimal(10, 2)), CAST(N'2024-03-08T11:48:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (35, 1, 1, N'A2 B4 C4', CAST(N'2024-03-01T11:57:00.000' AS DateTime), CAST(200.00 AS Decimal(10, 2)), CAST(N'2024-03-15T11:57:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (36, 1, 1, N'A1 A2 A3', CAST(N'2024-03-01T11:59:00.000' AS DateTime), CAST(600.00 AS Decimal(10, 2)), CAST(N'2024-03-08T12:00:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (37, 1, 1, N'A1 A2 A3 A4 A5', CAST(N'2024-03-01T12:06:00.000' AS DateTime), CAST(1000.00 AS Decimal(10, 2)), CAST(N'2024-03-08T12:06:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (38, 1, 1, N'A1 A2 A3 A4', CAST(N'2024-03-01T12:09:00.000' AS DateTime), CAST(200.00 AS Decimal(10, 2)), CAST(N'2024-03-08T12:09:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (39, 1, 1, N'A1 A2 A3 A4 A5', CAST(N'2024-03-01T12:10:00.000' AS DateTime), CAST(1000.00 AS Decimal(10, 2)), CAST(N'2024-03-08T12:10:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (40, 2, 1, N'A1 A2 ', CAST(N'2024-03-01T12:14:00.000' AS DateTime), CAST(600.00 AS Decimal(10, 2)), CAST(N'2024-03-08T12:14:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (41, 1, 1, N'A1 A2', CAST(N'2024-03-01T12:16:00.000' AS DateTime), CAST(400.00 AS Decimal(10, 2)), CAST(N'2024-03-08T12:16:00.000' AS DateTime), 0)
INSERT [dbo].[Bookings] ([BookingId], [UserId], [MovieId], [SelectedSeats], [BookingDate], [TotalPrice], [MovieTime], [IsDeleted]) VALUES (42, 2, 2, N'A2 A3', CAST(N'2024-03-01T13:35:00.000' AS DateTime), CAST(400.00 AS Decimal(10, 2)), CAST(N'2024-03-15T15:35:00.000' AS DateTime), 0)
SET IDENTITY_INSERT [dbo].[Bookings] OFF
GO
SET IDENTITY_INSERT [dbo].[Movies] ON 

INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (1, N'The Shawshank Redemption', N'Drama', N'Frank Darabont', N'English', CAST(N'1994-09-22' AS Date), 100, CAST(10.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'shawshank_redemption.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (2, N'Inception', N'Sci-Fi', N'Christopher Nolan', N'English', CAST(N'2010-07-16' AS Date), 120, CAST(12.50 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'inception.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (3, N'The Dark Knight', N'Action', N'Christopher Nolan', N'English', CAST(N'2008-07-18' AS Date), 110, CAST(11.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'dark_knight.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (4, N'Pulp Fiction', N'Crime', N'Quentin Tarantino', N'English', CAST(N'1994-10-14' AS Date), 95, CAST(9.50 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'pulp_fiction.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (5, N'The Godfather', N'Crime', N'Francis Ford Coppola', N'English', CAST(N'1972-03-24' AS Date), 105, CAST(10.50 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'godfather.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (6, N'Viswasam', N'Action', N'Siva', N'Tamil', CAST(N'2019-01-10' AS Date), 90, CAST(9.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'viswasam.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (7, N'Kaithi', N'Action', N'Lokesh Kanagaraj', N'Tamil', CAST(N'2019-10-25' AS Date), 85, CAST(8.50 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'kaithi.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (8, N'Vikram Vedha', N'Thriller', N'Pushkar-Gayathri', N'Tamil', CAST(N'2017-07-21' AS Date), 95, CAST(9.50 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'vikram_vedha.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (9, N'Asuran', N'Action', N'Vetrimaaran', N'Tamil', CAST(N'2019-10-04' AS Date), 100, CAST(10.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'asuran.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (10, N'Pariyerum Perumal', N'Drama', N'Mari Selvaraj', N'Tamil', CAST(N'2018-09-28' AS Date), 80, CAST(8.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'pariyerum_perumal.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (11, N'Dangal', N'Biography', N'Nitesh Tiwari', N'Hindi', CAST(N'2016-12-23' AS Date), 110, CAST(11.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'dangal.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (12, N'3 Idiots', N'Comedy-Drama', N'Rajkumar Hirani', N'Hindi', CAST(N'2009-12-25' AS Date), 105, CAST(10.50 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'3_idiots.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (13, N'PK', N'Satire', N'Rajkumar Hirani', N'Hindi', CAST(N'2014-12-19' AS Date), 100, CAST(10.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'pk.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (14, N'Gully Boy', N'Musical-Drama', N'Zoya Akhtar', N'Hindi', CAST(N'2019-02-14' AS Date), 95, CAST(9.50 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'gully_boy.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (15, N'Lagaan', N'Sports-Drama', N'Ashutosh Gowariker', N'Hindi', CAST(N'2001-06-15' AS Date), 120, CAST(12.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'lagaan.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (16, N'Sairat', N'Romance-Drama', N'Nagraj Manjule', N'Marathi', CAST(N'2016-04-29' AS Date), 85, CAST(8.50 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'sairat.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (17, N'Natsamrat', N'Drama', N'Mahesh Manjrekar', N'Marathi', CAST(N'2016-01-01' AS Date), 90, CAST(9.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'natsamrat.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (18, N'Court', N'Drama', N'Chaitanya Tamhane', N'Marathi', CAST(N'2014-09-18' AS Date), 80, CAST(8.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'court.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (19, N'Balak Palak', N'Comedy-Drama', N'Ravi Jadhav', N'Marathi', CAST(N'2013-01-04' AS Date), 85, CAST(8.50 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'balak_palak.jpg', 0)
INSERT [dbo].[Movies] ([MovieId], [Title], [Genre], [Director], [Language], [ReleaseDate], [AvailableSeats], [TicketPrice], [AverageRating], [Description], [ManagerId], [ImageUrl], [IsDeleted]) VALUES (20, N'Shwaas', N'Drama', N'Sandesh Kulkarni', N'Marathi', CAST(N'2004-09-17' AS Date), 75, CAST(7.50 AS Decimal(10, 2)), CAST(0.00 AS Decimal(3, 2)), NULL, 1, N'shwaas.jpg', 0)
SET IDENTITY_INSERT [dbo].[Movies] OFF
GO
SET IDENTITY_INSERT [dbo].[RatingAndReviews] ON 

INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (15, 1, 1, 4, N'Great movie, loved the storyline!', CAST(N'2024-02-29T11:18:55.483' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (16, 2, 2, 5, N'Mind-bending! One of Nolan''s best works.', CAST(N'2024-02-29T11:18:55.483' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (17, 3, 3, 5, N'Heath Ledgers Joker is iconic. A must-watch!', CAST(N'2024-02-29T11:18:55.483' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (22, 1, 1, 3, N'sssssssssssssssssss', CAST(N'2024-03-01T14:11:08.443' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (23, 1, 1, 3, N'sssssssssssssssssss', CAST(N'2024-03-01T14:11:08.910' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (24, 1, 1, 3, N'sssssssssssssssssss', CAST(N'2024-03-01T14:11:09.097' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (25, 1, 1, 3, N'sssssssssssssssssss', CAST(N'2024-03-01T14:13:44.007' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (26, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:56.800' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (27, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:57.050' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (28, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:57.237' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (29, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:57.413' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (30, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:57.553' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (31, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:57.720' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (32, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:57.883' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (33, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:58.047' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (34, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:58.217' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (35, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:58.373' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (36, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:58.537' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (37, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:58.700' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (38, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:59.017' AS DateTime), 0)
INSERT [dbo].[RatingAndReviews] ([RatingId], [MovieId], [UserId], [Rating], [ReviewText], [ReviewDate], [IsDeleted]) VALUES (39, 1, 1, 5, N'km', CAST(N'2024-03-01T14:13:59.020' AS DateTime), 0)
SET IDENTITY_INSERT [dbo].[RatingAndReviews] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserId], [Name], [Email], [Phone], [Password], [IsDeleted]) VALUES (1, N'John Doe', N'john@example.com', N'1234567890', N'password123', 0)
INSERT [dbo].[Users] ([UserId], [Name], [Email], [Phone], [Password], [IsDeleted]) VALUES (2, N'Alice Smith', N'alice@example.com', N'9876543210', N'securepassword', 0)
INSERT [dbo].[Users] ([UserId], [Name], [Email], [Phone], [Password], [IsDeleted]) VALUES (3, N'Bob Johnson', N'bob@example.com', N'5551234567', N'bobspassword', 0)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Admins__C9F2845633F72C9B]    Script Date: 9/2/2024 12:56:34 PM ******/
ALTER TABLE [dbo].[Admins] ADD UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__TheaterM__A9D10534BB978DE5]    Script Date: 9/2/2024 12:56:34 PM ******/
ALTER TABLE [dbo].[TheaterManager] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__A9D105348A648BD5]    Script Date: 9/2/2024 12:56:34 PM ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Admins] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Bookings] ADD  DEFAULT (getdate()) FOR [BookingDate]
GO
ALTER TABLE [dbo].[Bookings] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Movies] ADD  DEFAULT ((0.0)) FOR [AverageRating]
GO
ALTER TABLE [dbo].[Movies] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[RatingAndReviews] ADD  DEFAULT (getdate()) FOR [ReviewDate]
GO
ALTER TABLE [dbo].[RatingAndReviews] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[TheaterManager] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[UserRewards] ADD  DEFAULT ((0)) FOR [Points]
GO
ALTER TABLE [dbo].[UserRewards] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD FOREIGN KEY([MovieId])
REFERENCES [dbo].[Movies] ([MovieId])
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[RatingAndReviews]  WITH CHECK ADD FOREIGN KEY([MovieId])
REFERENCES [dbo].[Movies] ([MovieId])
GO
ALTER TABLE [dbo].[RatingAndReviews]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserRewards]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[RatingAndReviews]  WITH CHECK ADD CHECK  (([Rating]>=(1) AND [Rating]<=(5)))
GO
USE [master]
GO
ALTER DATABASE [ReelBooking_MajorApp] SET  READ_WRITE 
GO
