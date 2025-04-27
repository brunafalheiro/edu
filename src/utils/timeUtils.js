class TimeUtils {
  static MINUTES_PER_TOPIC = 10;
  static MINUTES_IN_HOUR = 60;

  /**
   * Formats duration in hours and minutes into a readable string
   * @param {number} hours - Number of hours
   * @param {number} minutes - Number of minutes
   * @returns {string} Formatted duration string
   */
  static formatDuration = (hours, minutes) => {
    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  };

  /**
   * Calculates the total estimated duration of a course
   * @param {Object} course - Course object containing classes and topics
   * @returns {string} Formatted duration string
   */
  static calculateCourseDuration = (course) => {
    const totalTopics = course.classes.reduce((total, cls) => total + cls.topics.length, 0);
    const totalMinutes = totalTopics * TimeUtils.MINUTES_PER_TOPIC;
    const hours = Math.floor(totalMinutes / TimeUtils.MINUTES_IN_HOUR);
    const minutes = totalMinutes % TimeUtils.MINUTES_IN_HOUR;
    
    return TimeUtils.formatDuration(hours, minutes);
  };

  /**
   * Calculates the time already studied in a course based on completed topics
   * @param {Object} course - Course object containing classes and topics
   * @param {Object} progress - Progress object containing completed topics
   * @returns {string} Formatted duration string
   */
  static calculateTimeStudied = (course, progress) => {
    if (!progress || !progress.completedContent) {
      return TimeUtils.formatDuration(0, 0);
    }

    let completedTopics = 0;
    Object.values(progress.completedContent).forEach(classContent => {
      completedTopics += classContent.filter(topic => topic.completed).length;
    });

    const totalMinutes = completedTopics * TimeUtils.MINUTES_PER_TOPIC;
    const hours = Math.floor(totalMinutes / TimeUtils.MINUTES_IN_HOUR);
    const minutes = totalMinutes % TimeUtils.MINUTES_IN_HOUR;

    return TimeUtils.formatDuration(hours, minutes);
  };

  /**
   * Calculates the remaining time to complete a course
   * @param {Object} course - Course object containing classes and topics
   * @param {Object} progress - Progress object containing completed topics
   * @returns {string} Formatted duration string
   */
  static calculateRemainingTime = (course, progress) => {
    const totalTopics = course.classes.reduce((total, cls) => total + cls.topics.length, 0);
    let completedTopics = 0;

    if (progress && progress.completedContent) {
      Object.values(progress.completedContent).forEach(classContent => {
        completedTopics += classContent.filter(topic => topic.completed).length;
      });
    }

    const remainingTopics = totalTopics - completedTopics;
    const totalMinutes = remainingTopics * TimeUtils.MINUTES_PER_TOPIC;
    const hours = Math.floor(totalMinutes / TimeUtils.MINUTES_IN_HOUR);
    const minutes = totalMinutes % TimeUtils.MINUTES_IN_HOUR;

    return TimeUtils.formatDuration(hours, minutes);
  };
}

export { TimeUtils };
